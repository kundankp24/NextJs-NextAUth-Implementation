"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card"
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button"
import Link from "next/link";
import {LoginForm} from '../../components/client/form';
import React from "react";

const Page = () => {

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <span>Or</span>
                    <form action="">
                        <Button type="submit" className="bg-blue-500" variant="outline">Login With Google</Button>
                    </form>
                    <Link href='/signup'>
                        Don't have an account? Sign up
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page