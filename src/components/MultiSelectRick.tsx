import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {SearchResultObject} from "../types/types";
import Option from "./multiSelect/Option";


const MultiSelectRick =()=>{
    const [inputValue , setInputValue] = useState<string>('');
    const [searchResult , setSearchResult] = useState<SearchResultObject[]>([])

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if (inputValue && inputValue.length > 2 ){
            const config = {
                method: 'get',
                url: 'https://rickandmortyapi.com/api/character/?name='+inputValue,
                headers: { }
            };

            axios.request(config)
                .then((response) => {
                    setSearchResult(response.data.results);
                })
                .catch((error) => {
                    setSearchResult([]);
                });
        }else {
            setSearchResult([]);
        }
    },[inputValue])
    return (
        <div className={'multiSelectContainer'}>
        <div
            className={'multiSelectHolder'}
            onClick={()=>{
                inputRef.current && inputRef.current.focus();
            }}>
            <div
                onClick={(e)=>{
                    e.stopPropagation();
                }}>
            </div>

            <input
                tabIndex={0}
                ref={inputRef}
                type={'text'}
                className={'multiSelectInput'}
                onKeyDown={(e)=>{}}
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}/>
        </div>
            <div className={'multiSelectOptionHolder'}>
                {searchResult.map((item)=>{
                    return (
                        <Option key={item.id} item={item} searchParam={inputValue}></Option>
                    )
                })}
            </div>
        </div>
    )
}

export default MultiSelectRick;
