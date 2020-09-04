"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
require("reflect-metadata");
const pg_god_1 = require("pg-god");
let conn;
const typeorm_1 = require("typeorm");
const group_1 = require("./entity/group");
const index_1 = require("./entity/index");
const block_1 = require("./entity/block");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/13996bc975154a40acbea388ed84fc2b"));
const contract = new web3.eth.Contract([
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getGroupIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_groupId",
                "type": "uint256"
            }
        ],
        "name": "getGroup",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256[]",
                "name": "indexes",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_indexId",
                "type": "uint256"
            }
        ],
        "name": "getIndex",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "ethPriceInWei",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "usdPriceInCents",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "usdCapitalization",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "percentageChange",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
], "0x4f7f1380239450AAD5af611DB3c3c1bb51049c29");
let AppService = AppService_1 = class AppService {
    static async superCreateConnection() {
        if (conn)
            return conn;
        const connectionOptions = await typeorm_1.getConnectionOptions();
        try {
            conn = await typeorm_1.createConnection();
            return conn;
        }
        catch (error) {
            if (error.code === '3D000') {
                await pg_god_1.createDatabase({ databaseName: "EtheriumdbNew" }, {
                    user: connectionOptions.username,
                    port: connectionOptions.port,
                    host: connectionOptions.host,
                    password: connectionOptions.password.toString()
                });
                return AppService_1.superCreateConnection();
            }
            throw error;
        }
    }
    static async getLastBlock() {
        const block = await web3.eth.getBlock('latest');
        AppService_1.superCreateConnection().then(async (connection) => {
            const blockRepository = connection.getRepository(block_1.Block);
            await blockRepository.clear();
            await blockRepository.save(block);
        });
        return block;
    }
    static getGroupIds() {
        return contract.methods.getGroupIds().call().then(function (result) {
            AppService_1.superCreateConnection().then(async (connection) => {
                for (let i in result) {
                    const realId = parseInt(result[i]);
                    const group = await AppService_1.getGroup(realId);
                    const groupRepository = connection.getRepository(group_1.Group);
                    const indexRepository = connection.getRepository(index_1.Index);
                    let groupInDB = await groupRepository.findOne(realId);
                    if (groupInDB == undefined) {
                        groupInDB = new group_1.Group();
                        groupInDB.id = realId;
                    }
                    groupInDB.name = group.name;
                    await groupRepository.save(groupInDB);
                    const indexIds = group.indexes;
                    for (let j in indexIds) {
                        const realId = indexIds[j];
                        const index = await AppService_1.getIndex(realId);
                        let indexesInDb = await indexRepository.findOne({ group: groupInDB, id: realId });
                        if (indexesInDb == undefined) {
                            indexesInDb = new index_1.Index();
                            indexesInDb.id = realId;
                        }
                        indexesInDb.group = groupInDB;
                        indexesInDb.name = index.name;
                        indexesInDb.ethPriceInWei = index.ethPriceInWei;
                        indexesInDb.percentageChange = index.percentageChange;
                        indexesInDb.usdCapitalization = index.usdCapitalization;
                        indexesInDb.usdPriceInCents = index.usdPriceInCents;
                        await indexRepository.save(indexesInDb);
                    }
                }
            }).catch(error => { console.log(error); return []; });
            return result;
        });
    }
    static async getGroup(id) {
        return await contract.methods.getGroup(id).call().then(async function (result) {
            return await result;
        });
    }
    static async getIndex(id) {
        return await contract.methods.getIndex(id).call().then(async function (result) {
            return await result;
        });
    }
};
AppService = AppService_1 = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map