import { auth } from "@/auth";
import ECommerce from "@/components/Dashboard/E-commerce";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const session = await auth()

  return (
    <>
      <ECommerce />
    </>
  );
}
