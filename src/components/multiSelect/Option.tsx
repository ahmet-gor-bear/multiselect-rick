import React, {KeyboardEvent} from "react";
import {OptionComponentType} from "../../types/types";


const Option = ({item,searchParam,onSelect,isSelected,focusController}:OptionComponentType)=>{

    const handleKeyDown =(event:KeyboardEvent<HTMLDivElement>)=>{
        if (event.code == 'Space'){
            handleClick();
            event.preventDefault();
        }
        if (event.code == 'ArrowDown'){
            const active = document.activeElement;
            if (active?.nextElementSibling) {
                (active.nextElementSibling as HTMLElement).focus();
            }
            event.preventDefault();
        }
        if (event.code == 'ArrowUp'){
            const active = document.activeElement;
            if (active?.previousElementSibling) {
                (active.previousElementSibling as HTMLElement).focus();
            }
            event.preventDefault();
        }
        if (event.code == 'Tab'){
            const active = document.activeElement;
            if (active?.nextElementSibling) {
                (active.nextElementSibling as HTMLElement).focus();
                event.preventDefault();
            }else {
                const active = document.activeElement;
                if (active?.nextElementSibling) {
                    (active.nextElementSibling as HTMLElement).focus();
                    event.preventDefault();
                }else {
                    const badges = document.getElementsByClassName('selectedBadge');
                    if (badges.length > 0 ){
                        (badges.item(0) as HTMLElement).focus();
                        event.preventDefault();
                    }else {
                        const input = document.getElementById('multiSelectorInput');
                        if (input){
                            input.focus();
                        }
                        event.preventDefault();
                    }

                }

            }


        }
    }

    const handleNameString = (input:string) =>{
        if (searchParam){
            const valueIndex = input.toLowerCase().indexOf(searchParam.toLowerCase().trim());
            const valueLength = searchParam.trim().length;

            if (valueIndex === -1){
                return input
            }

            const before = input.substring(0,valueIndex);
            const present = input.substring(valueIndex,valueIndex+valueLength);
            const after = input.substring(valueIndex+valueLength,input.length)

            return <i style={{fontStyle:'normal'}}>{before}<i style={{fontWeight:'bold',fontStyle:'normal'}}>{present}</i>{after}</i>;
        }else {
            return input;
        }
    }

    const handleClick = ()=>{
        if (typeof onSelect == 'function'){
            onSelect(item);
        }
    }

    return(
        <div
            key={item.id}
            className={'singleOptionWrapper'}
            tabIndex={0}
            onKeyDown={(e)=>{handleKeyDown(e)}}
            onClick={()=>{handleClick()}}
            onFocus={()=>{
                typeof focusController == 'function' && focusController(true)
            }}
            onBlur={()=>{
                typeof focusController == 'function' && focusController(false)
            }}
        >
            <div>
                <input type={'checkbox'} checked={isSelected} readOnly={true}/>
            </div>
            <img src={item.image} alt={item.name} className={'optionImage'}/>
            <div className={'optionTextWrapper'}>
                <div className={'optionNameText'} >{handleNameString(item.name)}</div>
                <div className={'optionEpisodesText'}>{item.episode.length} Episode{item.episode.length > 1 ?'s':''}</div>
            </div>
        </div>
    )
}


export default Option;
