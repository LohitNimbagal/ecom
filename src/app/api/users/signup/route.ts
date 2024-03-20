// @ts-nocheck

import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

await connect()

interface UserType {
    username: string,
    email: string
    password: string,
    verfied: boolean,
}

export async function POST(request: NextRequest) {
    try {

        const { username, email, password }: { username: string; email: string; password: string } = await request.json()
        // const { username, email, password } = requestBody
        // console.log(requestBody);

        // check if user exists
        const user: UserType | null  = await User.findOne({ email: email })
        console.log(user);


        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt: string = await bcryptjs.genSalt(10)
        const hashedPassword: string = await bcryptjs.hash(password, salt)

        const newUser: UserType  = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser: UserType  = await newUser.save()
        return NextResponse.json({ messgae: "OK", savedUser }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ messgae: "Error", error }, { status: 500 })
    }
};

