"use client"

import { useEffect, useState } from "react";
import { z } from "zod"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const formSchema = z.object({
  email: z.string().email(), // Ensure the email is in a valid email format
  password: z.string().min(8), // Ensure the password is at least 8 characters long
})


export default function HomePage() {

  const [categories, setCategories] = useState([])
  const router = useRouter()
  const pageNumber = 2

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.post("api/users/category/all", { pageNumber: pageNumber })
        console.log(response.data);
        setCategories(response.data.categories)
      } catch (error: any) {
        console.log(error.message);
      }
    }
    getCategories()
  }, [])

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

              {categories.map((cat) => (
                <li key={cat.name} className="flex items-center gap-3">
                  <Checkbox id={cat} 
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
            <Pagination>
              <PaginationContent>
                
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
