// "use client";
// import LoadingPage from '@/components/Loading';
// import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //   },
  // })
  // if (status === "loading") {
  //   return <LoadingPage />
  // } else if (status === "authenticated") {
  //   redirect("dashboard");
  // }
  return null;
}
