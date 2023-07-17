import { SafeUser } from "@/types"
import { MenuItems } from "@/constants"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface UserMenuProps {
    currentUser: SafeUser | null
    closeUserMenu: () => void
}

export default function UserMenu({ currentUser, closeUserMenu }: UserMenuProps) {
    const router = useRouter()

    return (
        <div className="
    flex flex-col h-[50vh] bg-white shadow-lg rounded-lg px-3 py-2 max-w-full min-w-[300px] top-0
    ">
            <div className="flex items-center gap-4 mb-5">

                <div className="w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center text-white cursor-pointer" onClick={() => router.push('/user')}>
                    <span>{currentUser?.name?.at(0)?.toUpperCase()}</span>
                    <span>{currentUser?.name?.at(1)?.toUpperCase()}</span>
                </div>

                <div className="flex flex-col">
                    <span>{currentUser?.name}</span>
                    <span className="text-gray-400">{currentUser?.email.substring(0, 25)}...</span>
                </div>

            </div>

            <div className="flex flex-col gap-3 font-light">
                {MenuItems.map((item) => (
                    <div key={item.id} onClick={closeUserMenu}>
                        <Link href={item.link}>{item.name}</Link>
                    </div>
                ))}
            </div>

            <div className="border-black border-[1px] py-2 px-2 mt-auto text-center">
                <button onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    )
}