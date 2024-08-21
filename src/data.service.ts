import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as path from 'path';

@Injectable()
export class DataService {
    data: JSON;

    async loadData(dbName: string, collectionName: string) {
        try {
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            this.data = JSON.parse(fileContent);
            return this.data
        } catch (error) {
            console.error('Error loading data.json:', error);
            return { result: "fail", cause: "NOT_FOUND_KEY" }
        }
    }

    async createDefaultDataBase(dbName: string, collectionName: string) {
        const content = { "key": { "value": 1 } }
        const jsonString = JSON.stringify(content, null, 2);
        const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
        try {
            await fs.access(filePath);
            return { result: "fail", cause: "ALREADY_EXIST" }
        } catch (error) {
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, jsonString, 'utf-8');
            return { result: "success", cause: "" }
        }
    }

    async addDocument(dbName: string, collectionName: string, key: string, value: JSON) {
        try { 
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            jsonData[key] = value;

            const updatedJsonString = JSON.stringify(jsonData, null, 2);
            await fs.writeFile(filePath, updatedJsonString, 'utf-8');
            return { result: "success", cause: "" }
        } catch {
            return { result: "fail", cause: "unknown" }
        }
    }

    async addField(dbName: string, collectionName: string, findBy: string, key: string, value: JSON) {
        try { 
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            jsonData[findBy][key] = value;

            const updatedJsonString = JSON.stringify(jsonData, null, 2);
            await fs.writeFile(filePath, updatedJsonString, 'utf-8');
            return { result: "success", cause: "" }
        } catch {
            return { result: "fail", cause: "unknown" }
        }
    }
    
    async addFieldValue(dbName: string, collectionName: string, findBy: string, key: string, value: number | string | boolean) {
        try { 
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            jsonData[findBy][key] = value;

            const updatedJsonString = JSON.stringify(jsonData, null, 2);
            await fs.writeFile(filePath, updatedJsonString, 'utf-8');
            return { result: "success", cause: "" }
        } catch (error) {
            console.log(error)
            return { result: "fail", cause: "unknown" }
        }
    }

    async editJson(dbName: string, collectionName: string, key: string, newJson: JSON) {
        try {
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const json = JSON.parse(fileContent);
            if (json.hasOwnProperty(key)) {
                json[key] = newJson;
                await fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf-8');
                return { result: "success", cause: "" }
            } else {
                return { result: "fail", cause: "NOT_FOUND_KEY" }
            }
        } catch (error) {
            return { result: "fail", cause: "NOT_FOUND_DB" }
        }
    }
    async deleteDocument(dbName: string, collectionName: string, key: string) {
        try {
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const json = JSON.parse(fileContent);
            if (json.hasOwnProperty(key)) {
                delete json[key];
                await fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf-8');
                return { result: "success", cause: "" }
            } else {
                return { result: "fail", cause: "NOT_FOUND_KEY" }
            }
        } catch (error) {
            return { result: "fail", cause: "NOT_FOUND_DB" }
        }
    }

    
    async deleteField(dbName: string, collectionName: string, key: string, field: string) {
        try {
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const json = JSON.parse(fileContent);
            if (json.hasOwnProperty(key)) {
                delete json[key][field];
                await fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf-8');
                return { result: "success", cause: "" }
            } else {
                return { result: "fail", cause: "NOT_FOUND_KEY" }
            }
        } catch (error) {
            return { result: "fail", cause: "NOT_FOUND_DB" }
        }
    }

    async loadDocument(dbName: string, collectionName: string, saveKey: string) {
        try {
            const filePath = join(__dirname, '..', 'db', dbName, collectionName, 'data.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent)[saveKey]
        } catch (error) {
            return { result: "fail", cause: "NOT_FOUND_KEY" }
        }

    }

    async getAccount(_id: string, _pw: string): Promise<Boolean> {
        const filePath = join(__dirname, '..', 'account', 'account.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        fileContent.split('\n').map(line => {
            const [id, pw, role] = line.split(':').map(part => part.trim());
            if (_id === id && _pw === pw) {
                return true;
            }
        })
        return false;
    }

    async isAdmin(_id: string, _pw: string): Promise<Boolean> {
        const filePath = join(__dirname, '..', 'account', 'account.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        fileContent.split('\n').map(line => {
            const [id, pw, role] = line.split(':').map(part => part.trim());
            if (_id === id && _pw === pw) {
                if (role === "admin") {
                    return true;
                } else { return false }
            }
        })
        return false;
    }

    async addUser(str: string) {
        try {
            const filePath = join(__dirname, '..', 'account', 'account.txt');
            let fileContent = await fs.readFile(filePath, 'utf-8');
            fileContent += `\n${str}`;
            await fs.writeFile(filePath, fileContent, 'utf-8');
            return { result: "success", cause: "" }
        } catch {
            return { result: "fail", cause: "unknown" }
        }
    }
}
