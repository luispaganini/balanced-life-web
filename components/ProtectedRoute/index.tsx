// components/ProtectedRoute.js
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { ReactNode } from "react";

const ProtectedRoute = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    
    if (!session) 
        redirect("/auth/signin");
    
    return children;
};

export default ProtectedRoute;