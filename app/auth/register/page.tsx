'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "@/types/models";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
    const router=useRouter()
  const [registerForm, setRegisterForm] = useState<Partial<User>>({
    email: "",
    role: "USER",
    name: "",
    password: "",
  });
  const [error, setError] = useState('');
  const handleRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e:FormEvent) => {
      e.preventDefault()
      setError('')
    console.log(JSON.stringify(registerForm))
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("🚀 ~ handleSubmitForm ~ data:", data)
    if (!res.ok) {setError(data.error || "Somthing went wrong!"); return}
    router.push('/auth/login')

  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col p-4 gap-2 justify-center items-center m-auto">
      <fieldset className="flex flex-col p-2 gap-2 mb-2">
        <legend className="font-extrabold">Register User </legend>
        <label htmlFor="name">
          enter your name
          <input
            type="text"
            name='name'
            value={registerForm?.name}
            onChange={handleRegisterForm}
          />
        </label>
        <label htmlFor="email">
          enter your email
          <input
            type="text"
            name='email'
            value={registerForm?.email}
            onChange={handleRegisterForm}
          />
        </label>
        <fieldset>
          <legend> Enter your role</legend>
          <label htmlFor="role-user">
            <input
              type="radio"
              id="role-user"
              name="role"
              value="USER"
              checked={registerForm?.role === "USER"}
              onChange={handleRegisterForm}
            />
            User
          </label>
          <label htmlFor="role-admin">
            <input
              value="ADMIN"
              type="radio"
              id="role-admin"
              name="role"
              onChange={handleRegisterForm}
            />
            Admin
          </label>
        </fieldset>
        <label htmlFor="password">
          enter your password
          <input
            type="password"
            name="password"
            value={registerForm?.password}
            onChange={handleRegisterForm}
          />
        </label>
      </fieldset>
      <button className="bg-green-900 text-white font-bold p-2 rounded-2xl" type="submit">Register</button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
