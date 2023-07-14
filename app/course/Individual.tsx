'use client'

import { SafeUser } from "../types"
import Button from "../(components)/Button"
import Image from "next/image"
import useBasket from "../hooks/useBasket"
import { getPriceWithCurrency } from "../utils/AllUtils"

interface Props {
    author?: string,
    price?: string,
    imageSrc?: string,
    name?: string,
    description?: string | null
    courseId: any,
    currentUser: SafeUser | null
}

export default function Induvidual({
    author,
    price,
    imageSrc,
    name,
    courseId,
    description,
    currentUser
}: Props) {

    const { hasBasket, toggleBasket } = useBasket({
        currentUser, courseId
    })

    const dummyImage = 'https://www.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_9504688.htm'

    return (
        <div className="min-h-[80vh] bg-zinc-900 flex flex-col lg:flex-row justify-between text-white p-2 items-center lg:mt-5 lg:px-5">
            <div className="flex flex-col relative">
                <h1 className="text-3xl">{name}</h1>
                <p className="text-gray-400">{author}</p>
                <p className="text-lg">{description}</p>
                <p className="font-bold">{getPriceWithCurrency('USD', Number(price))}</p>
                <p className="text-sm text-white border-t-2 py-2">**30 day money back guarantee</p>
            </div>

            <div className="flex flex-col p-2 items-center bg-white">

                <div>
                    <Image width={900} height={500} src={imageSrc ? imageSrc : dummyImage} alt={name ? name : ""}
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="flex flex-col gap-1">
                        <p>{getPriceWithCurrency('USD', Number(price))}</p>
                        <Button onClick={toggleBasket} type="button" label={`${hasBasket ? 'Remove from basket' : 'Add to basket'}`} />
                        <Button type="button" label="Buy now" outline />
                    </div>
                </div>
            </div>
        </div>
    );
}