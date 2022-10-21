import type { Document, WithId } from 'mongodb'

export default class ModelMongo {

    protected _data: Document = {}  

    public toDocument(): Document {

        if( Object.keys(this._data).length > 0 ) {
            return this._data
        }

        const clone = { ...this }
        delete (clone as unknown as {[key:string]: unknown})['_id']
        return clone
    }

    public fromDocument<T extends ModelMongo>(this:T, document: WithId<Document> | Document): T {

        this._data = document

        if( document ) {
            Object.entries(document).forEach( ([key, value]) => {
                (this as unknown as {[key:string]: unknown})[key] = value
            })
        }

        return <T>this
    }
}
