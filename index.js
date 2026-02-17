import dotenv from "dotenv"
import express from "express"
import { MongoClient, ServerApiVersion } from "mongodb"
dotenv.config()

const app = express()
const uri = process.env.MONGO_DB_URI
const port = 3000

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

app.get('/panes',async (req, res) => {
    try {
        await client.connect()
        const db = client.db('Panaderia')
        const productos = db.collection('Panes')
        const lista = await productos.find({}).toArray()

        res.json({success: true, data: lista})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }finally{
        await client.close()
    }
})

app.listen(port, () =>{
    console.log(`URL: http://localhost:${port}/panes`)
})