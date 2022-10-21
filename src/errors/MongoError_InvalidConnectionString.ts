import MongoError from './MongoError'

export default class MongoError_InvalidConnectionString extends MongoError {
    
    override name = 'MongoError_InvalidConnectionString'
    reason: string

    constructor(reason: string) {

        super(`Mongo Error Connection String Invalid. Reason: '${reason}'`)
        this.reason = reason
    }
}
