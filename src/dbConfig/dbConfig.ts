import mongoose from 'mongoose';

export async function connect () {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("DB connection established");
        })

        connection.on('error',(err) =>{
            console.log('DB connection error, Make sure Its running', +err);
            process.exit();
        }); 

    }catch (err) {
        console.log('Something Went Wrong');
        console.log(err);
    }
}