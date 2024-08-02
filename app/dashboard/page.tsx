import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Balanced Life",
};

export default function Dashboard() {
  return (
    <>
      <ECommerce />
    </>
  );
}
