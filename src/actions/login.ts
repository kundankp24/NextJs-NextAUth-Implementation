"use server";
import {signIn} from '../auth'
import { redirect } from "next/navigation";

const credentialsLogin= async (email: string, password: string)=>{

    try {
        await signIn("credentials", {
            email,
            password,
        });

    } catch (error) {
        const err= error as Error
        console.log(err.message)
        return err.message;
    }
}
export {credentialsLogin};