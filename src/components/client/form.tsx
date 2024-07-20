"use client";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from "sonner"
import {credentialsLogin} from '../../actions/login';
import React from 'react';

const LoginForm=()=>{
    return(
    <form action={async (formData)=>{
        const email= formData.get("email") as string 
        const password= formData.get("password") as string

        if(!email || !password){
            return toast.error('Please provide all fields');
        }

        const toastId=toast.loading("Logging in");

        const error=await credentialsLogin(email, password);
        // console.log(error)
        if(!error){
            toast.success('Login successful',{
                id: toastId
            })
        }
        else{
            toast.error(String(error),{
                id: toastId
            })
        }
    }} 
    className="flex flex-col gap-4">
        <Input placeholder="email" name="email"/>
        <Input placeholder="password" name="password"/>
        <Button type="submit">Login</Button>
    </form>
    )
}
export {LoginForm};