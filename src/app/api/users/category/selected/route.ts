// @ts-nocheck

import { connect } from '@/dbConfig/dbConfig'
import SelectedCategory from '@/models/selectedCat';
import { NextRequest, NextResponse } from "next/server";

await connect()

interface CatType {
    _id: string,
    categories: string[]
}

interface SelectedCategoryDocument {
    _id: string,
    categories: string[]
    username: string
}

export async function POST(request: NextRequest) {
    try {
        const requestBody: { _id: string} = await request.json();
        const { _id } = requestBody;

        const userCat: CatType = await SelectedCategory.findOne({ _id }) as CatType;

        if (userCat) {
            console.log(userCat.categories);
            return NextResponse.json({ message: "OK", userCat }, { status: 201 });
        }
        return NextResponse.json({ message: "No Cat" }, { status: 500 });

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const requestBody: { categories: string[], _id: string }  = await request.json()
        const { categories, _id } = requestBody

        const userCat: SelectedCategoryDocument = await SelectedCategory.findOne({ _id })

        if (!userCat) {
            const newSelectedCategory: SelectedCategoryDocument = new SelectedCategory({
                categories,
                _id,
                username
            })
            const savedSelectedCategory: SelectedCategoryDocument = await newSelectedCategory.save()
            return NextResponse.json({ messgae: "OK", savedSelectedCategory }, { status: 201 })
        } else {
            await userCat.updateOne({ "categories": categories })
            return NextResponse.json({ messgae: "Categories updated", }, { status: 201 })
        }

    } catch (error) {
        return NextResponse.json({ messgae: "Error", error }, { status: 500 })

    }
}