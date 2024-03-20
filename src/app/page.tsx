"use client"

import { z } from "zod"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { PaginationSection } from "@/components/PaginationSection";


const formSchema = z.object({
  email: z.string().email(), // Ensure the email is in a valid email format
  password: z.string().min(8), // Ensure the password is at least 8 characters long
})

interface Category {
  id: number;
  name: string;
  _id: string;
  // Add other properties if present
}

interface ResponseData {
  message: string;
  totalPages: number;
  categories: Category[];
  // Add other properties if present
}

export default function HomePage() {

  const [categories, setCategories] = useState<Category[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [data, setData] = useState<ResponseData>({
    message: "",
    totalPages: 17,
    categories: [],
  })

  useEffect(() => {
    const getCategories = () => {
      return axios.post<ResponseData>("api/users/category/all", { pageNumber })
        .then(response => {
          setData(response.data);
          setCategories(response.data.categories);
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
        });
    };

    getCategories();
  }, [pageNumber])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Please mark your interest!</CardTitle>

            <p>We will keep you notified.</p>
          </CardHeader>

          <CardContent>
            <ul className="space-y-5">
              <p className="text-lg">Save my Interests!</p>

              {categories.map((cat: Category) => (
                <li key={cat.name} className="flex items-center gap-3">
                  <Checkbox id={cat.name}
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor={cat.name}
                    className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cat.name}
                  </label>
                </li>
              ))}

            </ul>
          </CardContent>

          <CardFooter className='flex-col gap-3'>
            <PaginationSection pageNumber={pageNumber} setPageNumber={setPageNumber} data={data} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
