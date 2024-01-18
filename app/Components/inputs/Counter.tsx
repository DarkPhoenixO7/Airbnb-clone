'use client';

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


interface ConterProps{
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number)=> void;
}

const Counter: React.FC<ConterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
    const onAdd = useCallback(()=>{
        onChange(value + 1);

    },[onChange, value]);

    const onReduce = useCallback(()=>{
        if (value ===1){
            return
        }
        onChange( value - 1);
    },[onchange, value]);
    return ( 
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}

                </div>
                <div className="font-light text-gray-600">
                   {subtitle}
                </div>

            </div>
            <div className="flex flex-row items-center gap-4">
                <div onClick={onReduce} className=" h-10
                 w-10 
                 rounded-full
                 border-[1px]
                 border-neutral-400
                 flex
                 justify-center
                 items-center
                 text-neutral-800
                 hover:opacity-80
                 transition
                 cursor-pointer">
                    <AiOutlineMinus />

                </div>
                <div className="font-light text-neutral-600 text-xl">
                    {value}
                </div>
                <div onClick={onAdd} className=" h-10
                 w-10 
                 rounded-full
                 border-[1px]
                 border-neutral-400
                 flex
                 justify-center
                 items-center
                 text-neutral-800
                 hover:opacity-80
                 transition
                 cursor-pointer">
                    <AiOutlinePlus />

                </div>

            </div>

        </div>
     );
}
 
export default Counter;