import { getById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const id: string = req.url.split("blogs/")[1] ?? "";
        const post = getById(id);
        if (!post) {
            return NextResponse.json({ messgae: "ERROR" }, { status: 400 })
        }
        return NextResponse.json({ messgae: "OK", post }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ messgae: "ERROR" }, { status: 500 })
    }

}
export const PUT = async (req: Request) => {
    console.log("PUT");
}
export const DELETE = async (req: Request) => {
    console.log("DELETE");
}