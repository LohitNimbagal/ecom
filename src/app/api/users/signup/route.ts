import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest){
    try {

        const requestBody = await request.json()
        const {username, email, password} = requestBody
        console.log(requestBody);
        
        // check if user exists
        const user = await User.findOne({email: email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User ({
            username,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save()
        return NextResponse.json({messgae: "OK", savedUser}, {status: 201})

    } catch (error) {
        return NextResponse.json({messgae: "Error", error}, {status: 500})
    }
};

