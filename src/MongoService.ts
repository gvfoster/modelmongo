import { MongoClient, Db } from 'mongodb'

import MongoError_InvalidConnectionString from './errors/MongoError_InvalidConnectionString'
import MongoError_InvalidEnvironmentConfiguration from './errors/MongoError_InvalidEnvironmentConfiguration'

const MONGO_CONNECTION_URI = 'MONGO_CONNECTION_URI'


/**
 * This class defines a structured api to the mongo database 
 * and should be used for all database interaction 
 * 
 * This class should be extended 
 */
export default class MongoService {

    private _mongo: MongoClient 
    private _db: Db 
    private _dburi: string

    private static _instance: MongoService

    public static instance<T extends MongoService>(this: { new(): T }): T {

        if( !MongoService._instance ) {
            MongoService._instance =  new this() as T
        }

        return MongoService._instance as T
    } 


    constructor(connectionUri?: string) {
        
        if(connectionUri) {
            this._dburi = connectionUri
        }

        else if(process.env[MONGO_CONNECTION_URI]) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._dburi = process.env[MONGO_CONNECTION_URI]!
        } 
        else {
            throw new MongoError_InvalidEnvironmentConfiguration(MONGO_CONNECTION_URI)
        }   
        
        this._mongo = new MongoClient(this._dburi)
        
        if(!this._mongo.db()) {
            throw new MongoError_InvalidConnectionString('database not provided')
        }

        this._db = this._mongo.db()

        console.log(`model-mongo using dburi: ${this._dburi}`)
        console.log(`model-mongo using db: ${this.db.databaseName}`)
    }

    get db() {
        return this._db
    }
}
