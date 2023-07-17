'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "@/(components)/Inputs/Input";
import Button from "@/(components)/Button";
import ImageUpload from "@/(components)/Inputs/ImageUpload";
import { useRouter } from "next/navigation";
import axios from "axios";


interface InitialValue {
  name:string,
  imageSrc:string,
  author:string,
  price:number,
  description:string
}

const initialValue:InitialValue = {
  name:'',
  imageSrc:'',
  author:'',
  description:'',
  price:0
}

export default function page() {

  const [state, setState] = useState(initialValue)

  const router = useRouter()
  const onSubmit = (e:FormEvent) => {
    e.preventDefault();

    axios.post('/api/course', state)
    .then(() => {
      router.push('/')
    })
    .catch((err) => {
      throw new Error(err)
    })

    router.refresh()
  }

  function handleChange(event:ChangeEvent<HTMLInputElement>) {
    setState({...state, [event.target.name]: event.target.value})
  }

  function setCustomValue(id: string, value: string) {
    setState((prevState) => ({
      ...prevState,
      [id] :value
    }))
  }

  return (
      <form className="flex flex-col items-center gap-4 mt-5" onSubmit={onSubmit}>
        <div 
        className="lg:w-[800px]
        md:w-[700px]
        sm:w-[500px]
        w-[400px]
        m-2 
        align-middle">
          <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
        </div>

        <div className="flex flex-col gap-2 py-4 max-w-3xl">
          <Input placeholder="Course name " id="name" type="text" value={state.name} name="name" onChange={handleChange}/>
          <Input placeholder='Authors' id='author' type='text' value={state.author} name='author' onChange={handleChange} />
          <Input placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange} textarea={true}/>
          <Input placeholder='Price' id='price' type='number' value={state.price === 0 ? "" : state.price.toString()} name='price' onChange={handleChange} />
          <Button
          label="Submit"
          type='Submit'
        />
        </div>

        
      </form>
    
  )
}