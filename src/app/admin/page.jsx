"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import Login from '@/app/components/auth/Login';
import Signup from "@/app/components/auth/Signup";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // if(!loading && user){
  //     router.push('/admin/dashboard');
  //     return null;
  // }

  return (
    <div className="font-sans grid pt-15 px-4 w-full">
      <Signup />
      <Login />
    </div>
  );
}
