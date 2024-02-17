import React, {KeyboardEvent} from "react";
import {SearchResultObject} from "../../types/types";


interface SelectedBadgeComponentType  {
    item: SearchResultObject;
    onSelect?:(item:SearchResultObject)=>void;
    focusController?:(result:boolean)=>void;
}

const SelectedBadge =({item,onSelect,focusController}:SelectedBadgeComponentType)=>{

    const handleKeyDown =(event:KeyboardEvent<HTMLDivElement>)=>{
        if (event.code == 'Space'){
            const active = document.activeElement;
            if (active?.nextElementSibling) {
                (active.nextElementSibling as HTMLElement).focus();
            }else {
                const input = document.getElementById('multiSelectorInput');
                if (input){
                    input.focus();
                }
            }
            handleClick();
            event.preventDefault();
        }
        if (event.code == 'ArrowRight'){
            const active = document.activeElement;
            if (active?.nextElementSibling) {
                (active.nextElementSibling as HTMLElement).focus();
            }
            event.preventDefault();
        }
        if (event.code == 'ArrowLeft'){
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
                const input = document.getElementById('multiSelectorInput');
                if (input){
                    input.focus();
                }
                event.preventDefault();
            }
        }
    }

    const handleClick = ()=>{
        if (typeof onSelect == 'function'){
            onSelect(item);
        }
    }

    return(
        <div
            className={'selectedBadge'}
             tabIndex={0}
             onKeyDown={(e)=>{handleKeyDown(e)}}
            onFocus={()=>{typeof focusController == 'function' && focusController(true)}}
            onBlur={()=>{typeof focusController == 'function' && focusController(false)}}
        >
            <div>{item.name}</div>
            <div className={'selectedBadgeClose'} onClick={handleClick}>X</div>
        </div>
    )
}

export default SelectedBadge;
