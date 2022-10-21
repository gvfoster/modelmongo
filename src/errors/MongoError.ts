
export default class MongoError extends Error {
    
    override name = 'MongoError'
    
    constructor(message:string) {
        super(message)
    }
}
