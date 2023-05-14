import mongoose, {connect, ConnectOptions} from 'mongoose';


export const dbConnect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error.message)
    )
}