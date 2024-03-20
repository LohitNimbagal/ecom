// @ts-nocheck

"use client"

import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from "@/components/ui/checkbox"
import { PaginationSection } from "@/components/PaginationSection";

interface Category {
  id: number;
  name: string;
  _id: string;
}

interface ResponseData {
  message: string;
  totalPages: number;
  categories: Category[];
  // Add other properties if present
}

interface CatType {
  _id: string,
  categories: Category[]
}

export default function HomePage() {

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<CatType[]>([])
  const [newSelCat, setNewSelCat] = useState<CatType[]>(selectedCategories)
  const [pageNumber, setPageNumber] = useState(1)
  const [user, setUser] = useState(null)
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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/users/getUser')
        setUser(res.data.data);

        if (user) {
          const response = await axios.post("api/users/category/selected", { _id: user?._id });
          setSelectedCategories(response.data.userCat.categories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })()
  }, [])

  useEffect(() => {
    console.log(newSelCat);
    if (user) {
      (async () => {
      try {
        const response = await axios.put<ResponseData>("api/users/category/selected", { categories: newSelCat, _id: user?._id });
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })()
    }
  }, [setNewSelCat])

  const handleCheck = (cat: string) => {
    if (newSelCat.includes(cat)) {
      setNewSelCat(prev => prev.filter(newSelCat => newSelCat !== cat));
    } else {
      setNewSelCat(prev => [...prev, cat]);
    }
  }

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
                  <Checkbox
                    id={cat.name}
                    checked={newSelCat.includes(cat.name)}
                    onCheckedChange={() => handleCheck(cat.name)}
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
