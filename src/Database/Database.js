const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const { promisify } = require('util');

// Promisify fs functions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = class JsonDatabase {
    constructor(filePath, autoDeleteInterval = 2) {
        if (!filePath || typeof filePath !== 'string') {
            throw new TypeError('The "filePath" argument must be of type string and cannot be undefined.');
        }

        this.filePath = filePath;
        this.autoDeleteInterval = autoDeleteInterval;
        this.db = {};
        this.load();
        this.scheduleAutoDelete();
    }

    async load() {
        try {
            const data = await readFile(this.filePath, 'utf8');
            this.db = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Arquivo não encontrado, iniciando um novo banco de dados.');
                this.db = {};
            } else {
                console.error('Erro ao ler o arquivo:', error);
                throw error;
            }
        }
    }

    async save() {
        await writeFile(this.filePath, JSON.stringify(this.db, null, 2), 'utf8');
    }

    async createTable(tableName, {err}) {
        return new Promise(async (resolve, reject) => {
            if (!this.db[tableName]) {
                this.db[tableName] = {};
                await this.save();
                resolve({code: 1, message: "tabela criada"});
            } else {
                if (err === "ignore") {
                    return;
                }
                reject({code: 0, message: "tabela ja existe"})
            }
    });
       
    }

    table(tableName) {
        if (!this.db[tableName]) {
            throw new Error(`tabela "${tableName}" não existe`);
        }
        return {
            get: (key) => this.db[tableName][key],
            set: async (key, value) => {
                this.db[tableName][key] = {
                    data: value,
                    timestamp: new Date().toISOString()
                };
                await this.save();
            },
            update: async (key, value) => {
                if (this.db[tableName][key] && typeof this.db[tableName][key].data === 'object' && typeof value === 'object') {
                    this.db[tableName][key].data = { ...this.db[tableName][key].data, ...value };
                } else {
                    this.db[tableName][key] = {
                        data: value,
                        timestamp: new Date().toISOString()
                    };
                }
                await this.save();
            },
            delete: async (key) => {
                delete this.db[tableName][key];
                await this.save();
            },
            find: (predicate) => {
                const results = [];
                for (const key in this.db[tableName]) {
                    if (predicate(this.db[tableName][key].data)) {
                        results.push(this.db[tableName][key].data);
                    }
                }
                return results;
            }
        };
    }

    scheduleAutoDelete() {
        schedule.scheduleJob(`*/${this.autoDeleteInterval} * * * *`, async () => {
            const now = new Date();
            const keysToDelete = [];

            for (const tableName in this.db) {
                for (const key in this.db[tableName]) {
                    const record = this.db[tableName][key];
                    const recordTime = new Date(record.timestamp);
                    const elapsedMinutes = (now - recordTime) / (1000 * 60);

                    if (elapsedMinutes > this.autoDeleteInterval) {
                        keysToDelete.push({ tableName, key });
                    }
                }
            }

            for (const { tableName, key } of keysToDelete) {
                delete this.db[tableName][key];
            }

            if (keysToDelete.length > 0) {
                await this.save();
                console.log(`Auto-delete: Removed ${keysToDelete.length} records.`);
            }
        });
    }
}