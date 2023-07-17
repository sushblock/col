'use client';


import Input from "@/(components)/Inputs/Input";
import ImageUpload from "@/(components)/Inputs/ImageUpload";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "@/(components)/Button";
import { getPriceWithCurrency } from "@/utils/AllUtils";


interface CourseProps {
    name?: string,
    imageSrc?: string
    author?: string
    price?: string,
    courseId?: string
    description?: string | null
}

interface InitalStateProps {
    name?: string,
    imageSrc: string
    author?: string
    price?: string,
    description?: string
}

const initialState: InitalStateProps = {
    name: '',
    imageSrc: '',
    author: '',
    price: '',
    description: ''
}


export default function UpdateCourseComponent({ name, price, courseId, description, author, imageSrc }: CourseProps) {


    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const setCustomValue = (id: any, value: any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const onUpdate = (e: FormEvent) => {
        setIsLoading(true)
        e.preventDefault();

        const updatedState = {
            name: state.name || name,
            price: state.price || price,
            description: state.description || description,
            author: state.author || author,
            imageSrc: state.imageSrc || imageSrc,
        };

        axios.put(`/api/course/${courseId}`, updatedState)
            .then(() => {

                toast.success('updated successfully')
                router.refresh()
                router.push('/')
            })
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <div className="flex flex-col items-center gap-4 mt-5 w-screen">

            <div className='w-full flex flex-col justify-center items-center'>
                <div className='p-4'>
                    <img src={imageSrc}
                        alt="Image"
                        className='max-w-[900px]
                    lg:w-[900px]
                    md:w-[700px]
                    sm:w-[500px]
                    w-screen
                    h-auto
                    bg-gray-50 
                    p-4 border-[2px] 
                    border-yellow-400' />
                    <div className="p-4">
                        <hr className='my-4' />
                        <h3 className="text-lg">{name}</h3>
                        <span className="text-gray-400 block text-sm font-normal">{author}</span>
                        <span className="text-lg">{getPriceWithCurrency('USD', Number(price))}</span>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={onUpdate} className="flex flex-col items-center gap-4 mt-5 w-screen">

                <div
                    className="lg:w-[800px]
                md:w-[700px]
                sm:w-[500px]
                w-[350px]
                m-2 
                align-middle">
                    <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                </div>

                <div className="flex flex-col gap-2 py-4 max-w-3xl">
                    <Input big placeholder='Course name' id='name' type='text' value={state.name} name='name' onChange={handleChange} />
                    <Input big placeholder='Authors' id='author' type='text' value={state.author} name='author' onChange={handleChange} />
                    <Input big placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange} />
                    <Input big placeholder='Price' id='price' type='number' value={state.price} name='price' onChange={handleChange} />

                    <Button disabled={isLoading} onClick={onUpdate} type='submit' label="Submit/Update" />
                </div>

            </form>

        </div>
    )
}