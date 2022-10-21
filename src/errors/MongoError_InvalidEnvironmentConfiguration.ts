import MongoError from './MongoError'

export default class FastMongoError_InvalidEnvironmentConfiguration extends MongoError {

    constructor(envVar: string) {
        super(`Mongo requires the environment variable '${envVar}'`)
    }
}
