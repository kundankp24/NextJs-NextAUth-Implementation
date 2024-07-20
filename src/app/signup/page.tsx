import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/utils";
import { CredentialsSignin } from "next-auth";

const Page = () => {
    const signUp=async(formData:FormData)=>{
        'use server'
        const name= formData.get("name") as string | undefined;
        const email= formData.get("email") as string | undefined;
        const password= formData.get("password") as string | undefined;
        const passwordConfirm= formData.get("passwordConfirm") as string | undefined;

        if(!name || !email || !password || !passwordConfirm){
            throw new Error("Please provide all field");
        } 
        if(password !== passwordConfirm) {
            throw new Error("Password and password confirm must be same");
        }
        //connection with database url
        await connectToDatabase();

        try {
            const user= await User.findOne({email});
    
            if(user){
                throw new Error("Email already exist");
            } 
    
            //hashed password
            const hashedPassword= await hash(password, 10);
    
            //create new user
            await User.create({
                name,
                email,
                password: hashedPassword,
            });
            redirect("/login");
            
        } catch (error) {
            const err= error as CredentialsSignin;
            return err.message;
        }
    }
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>SignUp</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={signUp}
                    className="flex flex-col gap-4">
                        <Input placeholder="name" name="name"/>
                        <Input placeholder="email" name="email"/>
                        <Input placeholder="password" name="passwordConfirm"/>
                        <Input placeholder="confirm password" name="password"/>
                        <Button type="submit">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <span>Or</span>
                    <form action="">
                        <Button type="submit" className="bg-blue-500" variant="outline">Login With Google</Button>
                    </form>
                    <Link href='/login'>
                        Already have an account? Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
  )
}

export default Page