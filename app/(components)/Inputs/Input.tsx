'use client'


interface InputProps {
    type?:string,
    value?:string | number,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string
    textarea?:boolean
    id:string
    placeholder?:string
    big?:boolean
    autocomplete?:string
}


export default function Input({
    type,
    value,
    onChange,
    name,
    textarea,
    id,
    placeholder,
    big,
    autocomplete
} : InputProps) {
    return (
        <input 
        type={type} 
        placeholder={placeholder} 
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        className={`
        p-6
        lg:w-[800px] 
        md:w-[600px]
        sm:w-[400px]
        w-[300px]
        font-light
        bg-white 
        border-2 
        outline-none  
          text-black 
          items-center
          ${textarea ? 'h-[300px]' : 'h-[30px]'}`}
        autoComplete={autocomplete}
        />
    )
}