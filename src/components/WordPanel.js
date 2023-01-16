import React, { useState, useRef, useEffect } from 'react';
import {EmptyWords} from './EmptyWords';
import { SetWord } from './SetWord';

export const WordPanel = (props) => {
    if(props.words.length!=0){
        return(
            <div className='word__wrapper'>
                {props.empty? <EmptyWords/>: <SetWord words={props.words} setEmpty={props.setEmpty} empty={props.empty}/>}
            </div>
        )
    }
}