import mongoose from "mongoose"
import dotenv from 'dotenv'
import colors from 'colors';
import users from './data/users'
import products from './data/products'
import User from './models/userModel'
import Product from './models/productModel'
import Order from './models/orderModel'
import connectDB from './config/db'
import { product, user, IUser, IProduct } from '../client/src/types/interfaces'

dotenv.config()

connectDB()

const importData = async ():Promise<void> => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser:IUser[] = await User.insertMany(users)
        const adminUser:mongoose.Types.ObjectId = createdUser[0]._id;

        const sampleProducts:product[] = products.map((product)=>{
            return {...product, user: adminUser, }
        });

        await Product.insertMany(sampleProducts)
        console.log('Data Imported!'.green.inverse);
        process.exit()
    } catch (error:any) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async ():Promise<void> => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse);
        process.exit()
    } catch (error:any) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}