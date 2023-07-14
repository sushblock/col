'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../(components)/Inputs/Input'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


interface InitialStateProps {
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    email:'',
    password:''
}

export default function page() {
    const [state,setState] = useState(initialState)
    const router = useRouter();

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value})
    }

    function onSubmit(event:FormEvent) {
        event.preventDefault();
        signIn(
            'credentials',{
                ...state,
                redirect:false
            }
        ).then((callback) => {
            if(callback?.ok){
                router.refresh();
            }else if(callback?.error){
                throw new Error('Wrong credentials');
            }

            router.push('/');

        })       
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4  mt-5">
            <div className='flex flex-col mx-auto gap-2'>
                <label className="text-2xl">Login</label>
                <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email} autocomplete="email"/>
                <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password} autocomplete="current-password"/>

                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
            </div>
            <div className=" mt-4">
                <div>Haven't got an account ? <Link href='/register' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link></div>
            </div>

        </form>
    )
}

