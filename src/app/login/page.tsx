import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>

                    <h3>Welcome back to ECOMMERCE</h3>
                    <p>The next gen business marketplace</p>
                </CardHeader>

                <CardContent>
                    <form>

                    </form>
                </CardContent>

                <CardFooter className='flex-col gap-3'>
                    <Button className='w-full tracking-wider'>LOGIN</Button>

                    <p>Don't have an Account? SIGN UP</p>
                </CardFooter>
            </Card>
        </div>
    )
}