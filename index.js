import { Web5 } from '@tbd54566975/web5';
import { webcrypto } from 'node:crypto';
import { readFile } from 'node:fs/promises';

if (!globalThis.crypto)
    globalThis.crypto = webcrypto;

const { web5, did: myDid } = await Web5.connect();

console.log('did', myDid);

const file = readFile('./package.json', { encoding: 'utf-8' });
const { jsonRecord } = await web5.dwn.records.create({
    data: file,
    message: {
        dataFormat: 'application/json'
    }
});

console.log('jsonRecord', jsonRecord);

console.log('jsonFile', await jsonRecord.data.text());

await jsonRecord.delete();

const { record } = await web5.dwn.records.create({
    data: 'Hello Web5',
    message: {
        dataFormat: 'text/plain'
    }
});

console.log('writeResult', record);

console.log('read', await record.data.text());

const updateResult = await record.update({
    data: "Hello, I'm updated"
});

console.log('updateResult', updateResult);

console.log('update', await record.data.text());

const deleteResult = await record.delete();

console.log('deleteResult', deleteResult);

process.exit();