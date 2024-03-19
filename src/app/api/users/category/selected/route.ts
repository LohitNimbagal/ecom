import { connect } from '@/dbConfig/dbConfig'
import SelectedCategory from '@/models/selectedCat';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { _id } = requestBody;

        const userCat = await SelectedCategory.findOne({ _id });

        if (userCat) {
            console.log(userCat.categories);
            return NextResponse.json({ message: "OK", userCat}, { status: 201 });
        } 
        return NextResponse.json({ message: "No Cat" }, { status: 500 });

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const requestBody = await request.json()
        const { categories,  _id } = requestBody

        const userCat = await SelectedCategory.findOne({ _id })

        if (!userCat) {
            const newSelectedCategory = new SelectedCategory({
                categories,
                _id,
            })
            const savedSelectedCategory = await newSelectedCategory.save()
            return NextResponse.json({ messgae: "OK", savedSelectedCategory }, { status: 201 })
        } else {
            await userCat.updateOne({ "categories": categories })
            return NextResponse.json({ messgae: "Categories updated", }, { status: 201 })
        }

    } catch (error) {
        return NextResponse.json({ messgae: "Error", error }, { status: 500 })

    }
}