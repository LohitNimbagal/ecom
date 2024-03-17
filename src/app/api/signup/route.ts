import { createUser, getUsers } from "@/app/lib/usersDb";
import { NextResponse } from "next/server";
import {users} from "../../lib/usersDb"

export const GET = async (req: Request, res: Response) => {
    try {
        const users = getUsers();
        return NextResponse.json({messgae: "OK", users}, {status: 200})
    } catch (error) {
        return NextResponse.json({messgae: "Error", error}, {status: 500})
    }
};

export const POST = async (req: Request, res: Response) => {
    const {username, email, password} = await req.json()
    try {
        const user = {username, email, password, id: (users.length + 1).toString()}
        createUser(user);
        return NextResponse.json({messgae: "OK", user}, {status: 201})

    } catch (error) {
        return NextResponse.json({messgae: "Error", error}, {status: 500})
    }
};

export const PUT = async (req: Request) => {
    console.log("PUT");
}
