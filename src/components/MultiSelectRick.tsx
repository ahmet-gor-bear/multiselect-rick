import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {SearchResultObject} from "../types/types";
import Option from "./multiSelect/Option";
import loader from '../asset/gif/loading.gif';
import SelectedBadge from "./multiSelect/SelectedBadge";


const MultiSelectRick =()=>{
    const [focusController,setFocusController] = useState<boolean>(false);
    const [inputValue , setInputValue] = useState<string>('');
    const [searchResult , setSearchResult] = useState<SearchResultObject[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [selectedResults , setSelectedResults] = useState<SearchResultObject[]>([])
    const [isAnyFocus , setIsAnyFocus] = useState<boolean>(false);
    const [inputFocus,setInputFocus] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const selectToggle = (item:SearchResultObject)=>{
        setSelectedResults((prev :SearchResultObject[]) =>{
            let isRemoved :boolean = false;
            const newSelects = prev.filter((value)=>{
                if (value.id == item.id){
                    isRemoved=true
                }
                return value.id != item.id;
            })

            if (!isRemoved){
                newSelects.push(item);
            }
            return newSelects;
        })
    }

    useEffect(()=>{
        if (!isAnyFocus && !inputFocus){
            setFocusController(false);
        }
    },[isAnyFocus,inputFocus]);

    useEffect(()=>{
        const search = ()=> {
            if (inputValue && inputValue.length > 2) {

                const config = {
                    method: 'get',
                    url: 'https://rickandmortyapi.com/api/character/?name=' + inputValue,
                    headers: {}
                };
                setLoading(true);
                axios.request(config)
                    .then((response) => {
                        setSearchResult(response.data.results);
                        setLoading(false);
                    })
                    .catch(() => {
                        setSearchResult([]);
                        setLoading(false);
                    });

            } else {
                setSearchResult([]);
            }
        }

        if (inputValue && inputValue.length > 2){
            setLoading(true);
        }else {
            setSearchResult([]);
            setLoading(false);
        }

        const debounce = setTimeout(search,400);

        return ()=>{clearTimeout(debounce)}
    },[inputValue])

    return (
        <div className={'multiSelectContainer'}>
        <div
            className={'multiSelectHolder'}
            onClick={(e)=>{
                inputRef.current && inputRef.current.focus();
                e.stopPropagation()
            }}>
            <div
                className={'selectedBadgeWrapper'}
                onClick={(e)=>{
                    e.stopPropagation();
                }}>
                {selectedResults.map((item:SearchResultObject)=>{
                    return (
                        <SelectedBadge
                            key={item.id}
                            item={item}
                            onSelect={(item)=>{selectToggle(item)}}
                            focusController={(result)=> {
                                setFocusController(result)
                                setIsAnyFocus(result)
                            }}
                        />
                    )
                })}
            </div>

            <input
                tabIndex={0}
                ref={inputRef}
                type={'text'}
                className={'multiSelectInput'}
                id={'multiSelectorInput'}
                onKeyDown={(e)=>{
                    if (e.code == 'Tab'){

                    }
                }}
                onFocus={()=>{
                    setFocusController(true)
                    setInputFocus(true)
                }}
                onBlur={()=>{
                    setInputFocus(false);
                }}
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}/>
        </div>
            {focusController &&
                <div className={'multiSelectOptionHolder'}>
                    {
                        inputValue.length < 3 && searchResult.length==0 &&
                        <div className={'multiSelectInfo'}>
                            Type at least 3 character to search
                        </div>
                    }
                    {
                        loading &&
                        <div className={'loaderWrapper'}>
                            <img src={loader} className={'loader'} alt={'loader'}/>
                        </div>
                    }
                    {
                        !loading && searchResult.length == 0 && inputValue.length > 2 &&
                        <div className={'multiSelectInfo'}>
                            No result found in the stack
                        </div>
                    }
                    {searchResult.map((item)=>{
                        return (
                            <Option
                                key={item.id}
                                item={item}
                                searchParam={inputValue}
                                onSelect={(item)=>{selectToggle(item)}}
                                isSelected={selectedResults.filter((value)=>value.id==item.id).length ==1}
                                focusController={(result)=> {
                                    setFocusController(result)
                                    setIsAnyFocus(result)
                                }}
                            />
                        )
                    })}
                </div>
            }

        </div>
    )
}

export default MultiSelectRick;
