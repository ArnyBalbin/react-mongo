import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conexionDatabase = async () => {
    await mongoose.connect(process.env.URI).then((res) => {
        console.log("Conectado a MongoDB")
    });
}

export default conexionDatabase;