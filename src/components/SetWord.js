import React, { useState, useRef, useEffect } from 'react';

export const SetWord = (props) =>{
    const inputWord = useRef();
    let [indexWord, setIndexWord] = useState(0);
    let [falseWord, setFalseWord] = useState(true);
    const dataLocal = [];
    useEffect(()=>{
    }, [indexWord])
    function onHandle(){
        if(props.words[indexWord].translates.includes(inputWord.current.value)){
            if(props.words[indexWord + 1]!=null){
                setIndexWord(indexWord + 1);
                setFalseWord(true);
                inputWord.current.value = null;
            }
            else{
                props.setEmpty(true);
            }
            dataLocalRight(props.words[indexWord].eng);
        }
        else{
            setFalseWord(false)
            dataLocalWrong(props.words[indexWord].eng);
        }
    }
    function dataLocalRight(obj){
        if(localStorage.getItem('words')){
            const parseData = JSON.parse(localStorage.getItem('words'));
            const item = parseData.findIndex((el)=> el.name===obj);
            if(item>-1){
                let itemOfIndex = parseData[item];
                parseData[item] = {
                    ...itemOfIndex,
                    right: itemOfIndex.right + 1
                }
                console.log(parseData)
                localStorage.setItem('words', JSON.stringify(parseData))
                console.log("WORK")
            }
            else{
                parseData.push({
                    name: obj,
                    right: 1,
                    wrong: 0
                })
                localStorage.setItem('words', JSON.stringify(parseData))
            }
        }
        else{
            const parseData = [];
            parseData.push({
                name: obj,
                right: 1,
                wrong: 0
            })
            localStorage.setItem('words', JSON.stringify(parseData))
        }
    }
    function dataLocalWrong(obj){
        if(localStorage.getItem('words')){
            const parseData = JSON.parse(localStorage.getItem('words'));
            const item = parseData.findIndex((el)=> el.name===obj);
            if(item>-1){
                let itemOfIndex = parseData[item];
                parseData[item] = {
                    ...itemOfIndex,
                    wrong: itemOfIndex.wrong + 1
                }
                localStorage.setItem('words', JSON.stringify(parseData))
            }
            else{
                parseData.push({
                    name: obj,
                    right: 0,
                    wrong: 1
                })
                localStorage.setItem('words', JSON.stringify(parseData))
            }
        }
        else{
            const parseData = [];
            parseData.push({
                name: obj,
                right: 0,
                wrong: 1
            })
            localStorage.setItem('words', JSON.stringify(parseData))
        }
    }
    return(
        <div className='word__container'> 
            <div className='word__eng-variant'>{props.words[indexWord].eng}</div>
            <input ref={inputWord} className={props.falseWord?'word__input': 'word__input wrong'} placeholder='Перевод...'></input>
            <div className={falseWord? 'word__notice': 'word__notice active'}>Неправильно! Спробуйте ще раз.</div>
            <button className='word__button' type='button' onClick={onHandle}>Перевірити</button>
        </div>
    )
}