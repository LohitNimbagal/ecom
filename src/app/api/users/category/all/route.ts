import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET() {
    try {


    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}