import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session= await auth();
  const user= session?.user;
  console.log("Home--->user ", session?.user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
