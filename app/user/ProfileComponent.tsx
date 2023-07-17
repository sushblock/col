'use client';

import Input from "@/(components)/Inputs/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEvent, useState } from "react";
import Button from "@/(components)/Button";
import { toast } from "react-hot-toast";


interface InitialStateProps {
    name: string,
    email: string,
    password: string
}

const initialState: InitialStateProps = {
    name: '',
    email: '',
    password: ''
}


interface ProfileProps {
    userId?: string | null,
    name?: string | null,
    email?: string | null

}


export default function ProfileComponent({ userId, name, email }: ProfileProps) {

    const router = useRouter()
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)


    function handleChange(event: any) {
        setState({ ...state, [event.target.name]: event.target.value });
        //console.log(event.target.value)
    }


    const onSubmit = (event: FormEvent) => {

        setIsLoading(true)
        event.preventDefault()

        axios.put(`/api/user/${userId}`, {
            ...state,
            name: state.name || name,
            email: state.email || email,
            hashedPassword: state.password
        })
            .then(() => {
                toast.success("profile updated")
                router.refresh()
                router.push('/')
            })
            .catch((err: any) => {
                throw new Error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    return (
        <div className="flex flex-col items-center gap-4 mt-5 w-screen">
            <div className='flex flex-col gap-2 py-2 max-w-3xl'> 
                <h1 className="text-2xl">{name}</h1>
                <h3 className="text-lg">{email}</h3>
            </div>
            <form onSubmit={onSubmit} className='flex flex-col items-center gap-4 mt-5 w-screen'>
                <div className='flex flex-col gap-2 py-4 max-w-3xl'>
                    <Input placeholder='Name' id='name' type='text' name='name' onChange={handleChange} value={state.name} />
                    <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email} />
                    <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password} />
                    <Button type='submit' label="Update" disabled={isLoading} />
                </div>
            </form>

        </div>
    )
}