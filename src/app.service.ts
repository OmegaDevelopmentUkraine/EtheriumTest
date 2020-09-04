import { Injectable } from '@nestjs/common';
import "reflect-metadata";

import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {createDatabase} from "pg-god";

let conn: Connection | undefined;

import {createConnection, getConnectionOptions, Connection} from "typeorm";
import { Group } from './entity/group';
import { Index } from './entity/index';
import { Block } from './entity/block';
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/13996bc975154a40acbea388ed84fc2b"))
const contract = new web3.eth.Contract(
    [
      {
        "inputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
      },
      {
        "constant":true,
        "inputs":[

        ],
        "name":"getGroupIds",
        "outputs":[
          {
            "internalType":"uint256[]",
            "name":"",
            "type":"uint256[]"
          }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
      },
      {
        "constant":true,
        "inputs":[
          {
            "internalType":"uint256",
            "name":"_groupId",
            "type":"uint256"
          }
        ],
        "name":"getGroup",
        "outputs":[
          {
            "internalType":"string",
            "name":"name",
            "type":"string"
          },
          {
            "internalType":"uint256[]",
            "name":"indexes",
            "type":"uint256[]"
          }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
      },
      {
        "constant":true,
        "inputs":[
          {
            "internalType":"uint256",
            "name":"_indexId",
            "type":"uint256"
          }
        ],
        "name":"getIndex",
        "outputs":[
          {
            "internalType":"string",
            "name":"name",
            "type":"string"
          },
          {
            "internalType":"uint256",
            "name":"ethPriceInWei",
            "type":"uint256"
          },
          {
            "internalType":"uint256",
            "name":"usdPriceInCents",
            "type":"uint256"
          },
          {
            "internalType":"uint256",
            "name":"usdCapitalization",
            "type":"uint256"
          },
          {
            "internalType":"int256",
            "name":"percentageChange",
            "type":"int256"
          }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
      }
    ]
    ,"0x4f7f1380239450AAD5af611DB3c3c1bb51049c29");

@Injectable()
export class AppService {

  static async superCreateConnection(): Promise<Connection> {
  if (conn) return conn

  const connectionOptions = await getConnectionOptions() as PostgresConnectionOptions;
  try {
    conn = await createConnection();
    return conn;
  } catch (error) {
    if (error.code === '3D000') {
      await createDatabase(
        { databaseName: "EtheriumdbNew" },
        {
          user: connectionOptions.username,
          port: connectionOptions.port,
          host: connectionOptions.host,
          password:connectionOptions.password.toString()
        }
      );
      return AppService.superCreateConnection();
    }
    throw error;
  }
  }

  static async getLastBlock(): Promise<Block> {
     const block = await web3.eth.getBlock('latest');
     AppService.superCreateConnection().then(async connection => {
       const blockRepository = connection.getRepository(Block);
       await blockRepository.clear();
       await blockRepository.save(block);
     })
     return block;
  }

  static getGroupIds(): string[] {
      return contract.methods.getGroupIds().call().then(function (result){
        AppService.superCreateConnection().then(async connection => {
      for(let i in result) {
          const realId = parseInt(result[i]);
          const group = await AppService.getGroup(realId)
          const groupRepository = connection.getRepository(Group);
          const indexRepository = connection.getRepository(Index);
          let groupInDB = await groupRepository.findOne(realId);
          if(groupInDB == undefined){
            groupInDB = new Group();
            groupInDB.id = realId;
          }
          groupInDB.name = group.name;
          await groupRepository.save(groupInDB);

          const indexIds = group.indexes;
          for(let j in indexIds){
            const realId = indexIds[j];
            const index = await AppService.getIndex(realId);
            let indexesInDb = await indexRepository.findOne({group: groupInDB, id: realId});
            if(indexesInDb == undefined){
              indexesInDb = new Index();
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
    }).catch(error => {console.log(error); return []});
      return result;
    });
  }

  static async getGroup(id): Promise<any>{
    return await contract.methods.getGroup(id).call().then(async function (result){
      return await result;
    });

  }
  static async getIndex(id): Promise<any>{
    return await contract.methods.getIndex(id).call().then(async function (result){
     return await result;
    });
  }

}
