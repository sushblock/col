'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '@/(components)/Inputs/Input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


interface InitialStateProps {
    name:string,
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    name:'',
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

        axios.post('/api/register',state)
        .then(() => {
            router.refresh()
        })
        .then(() => {
            setTimeout(() => {
                router.push('/login')
            },2500)
        })

        .catch((error:any) => {
            console.log(error);
        })
    }

    return (
        
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4 mt-5">
            <div className='flex flex-col mx-auto gap-2'>
                <label className="text-2xl">New User Registration</label>
                <Input placeholder='Name' id='name' type='text' name='name' onChange={handleChange} value={state.name} autocomplete="name"/>
                <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email} autocomplete="email"/>
                <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password} autocomplete="current-password"/>

                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </div>
            <div>
                <div>Do you have an account ? <Link href='/login' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign in</Link></div>
            </div>

        </form>
    )
}

