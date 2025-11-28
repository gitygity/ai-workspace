"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface loginForm {
  password: string;
  email: string;
}
export default function LoginPage() {
    const [error,setError]=useState('')
    const { data: session } = useSession();
  const [loginForm, setLoginForm] = useState<loginForm>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('')
    const res=await signIn('credentials',{
        redirect:false,
        ...loginForm
    })
    if(res?.error) { 
        setError('wrong Email or Password') 
        return
    }
    redirectToDashboard()
  };

  const redirectToDashboard=()=>{
    if(session?.user?.role==='ADMIN'){
      router.push('/admin/dashboard')
      return
    }
    router.push('/user/dashboard')
  }

  const handleSetForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
      setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="mt-[10vh] flex flex-col gap-2 p-4 w-1/2 items-center m-auto shadow-2xl border border-accent justify-center"
      onSubmit={handleLogin}>
      <fieldset className="flex flex-col mt-4">
        <legend>Login User</legend>
        <label htmlFor="email">Enter user Email
              <input
          id="email"
          name="email"
          onChange={handleSetForm}
          value={loginForm?.email}
          type="text"
        />
        </label>
      
        <label htmlFor="password">Enter user Password
              <input
          onChange={handleSetForm}
          value={loginForm?.password}
          name="password"
          type="password"
        />
        </label>
      
      </fieldset>

      <button
        className="bg-green-900 text-white font-bold p-2 rounded-2xl w-36"
        type="submit">
        Login
      </button>
       {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
