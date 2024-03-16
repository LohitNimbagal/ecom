import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form>

                    </form>
                </CardContent>

                <CardFooter className='flex-col gap-3'>
                    <Button className='w-full tracking-wider'>CREATE ACCOUNT</Button>

                    <p>Have an Account? LOGIN</p>
                </CardFooter>
            </Card>
        </div>
    )
}