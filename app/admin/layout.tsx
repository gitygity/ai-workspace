import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AdminLayout({ children }: { children: React.ReactNode }){
    const session=await getServerSession(authOptions)
    if(!session) return redirect('/auth/login')
    if(session.user.role!=='ADMIN') return redirect('/unauthorized')
    return <>{children}</>
}