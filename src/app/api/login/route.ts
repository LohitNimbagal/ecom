import { getById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    try {
        const posts = getPosts();
        return NextResponse.json({messgae: "OK", posts}, {status: 200})
    } catch (error) {
        return NextResponse.json({messgae: "Error", error}, {status: 500})
    }
};

export const POST = async (req: Request, res: Response) => {
    const {title, desc} = await req.json()
    try {
        const post = {title, desc, date: new Date(), id: Date.now().toString()}
        addPost(post);
        return NextResponse.json({messgae: "OK", post}, {status: 201})

    } catch (error) {
        return NextResponse.json({messgae: "Error", error}, {status: 500})
    }
};

export const PUT = async (req: Request) => {
    console.log("PUT");
}
