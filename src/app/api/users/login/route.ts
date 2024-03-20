// @ts-nocheck

import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

await connect()

interface TokenDataType {
    id: string,
    userName: string,
    email: string
}

export async function POST(request: NextRequest) {
    try {

        const requestBody = await request.json()
        const { email, password } = requestBody
        console.log(requestBody);

        // check if user exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })
        }
        console.log("User Exists");


        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        // create token 
        const tokenData: TokenDataType = {
            id: user._id,
            userName: user.username,
            email: user.email
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response

    } catch (error) {
        return NextResponse.json({ messgae: "Error", error }, { status: 500 })
    }
};