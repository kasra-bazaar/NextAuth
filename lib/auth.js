import { MongoClient } from "mongodb"



const ConnectToTheMongoDb = async () => { 
    const client = MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
    return client
}
export default ConnectToTheMongoDb