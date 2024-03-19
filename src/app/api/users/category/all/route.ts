import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel"
import { json } from 'stream/consumers';

connect()

export async function POST(request: NextRequest) {

    const requestBody = await request.json();
    const { pageNumber } = requestBody;

    const pageSize = 6;
    const skip = ((pageNumber || 1) - 1) * pageSize;
    try {

        // Count the total number of documents in the Category collection
        const totalCount = await Category.countDocuments({});

        // Calculate the total number of pages based on the page size
        const totalPages = Math.ceil(totalCount / pageSize);

        // Use the find method on the Category model to retrieve categories with pagination
        const categories = await Category.find({})
            .skip(skip)
            .limit(pageSize);

        // console.log(`Categories (Page ${pageNumber}):`, categories);

        return NextResponse.json({ message: "OK", PageNumber: pageNumber || 1, totalPages: totalPages, categories })
    } catch (error) {
        return NextResponse.json({ messgae: "Error", error }, { status: 500 })
    }
}