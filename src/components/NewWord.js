import React, { useEffect, useState, useRef } from 'react';
import { Category } from './Category';
import { category_img } from './CategoryImg';
import {ReactComponent as Basket} from '../svg/basket.svg'
import {Routes, Route, Link} from 'react-router-dom';

export const NewWord = (props) => {
    const [categorySelected, setCategorySelected] = useState('');
    const [indexCategory, setIndexCategory] = useState();
    const [wordsSelected, setWordsSelected] = useState([]);
    let [empty, setEmpty] = useState(false);
    const [arrayWord, setArrayWord] = useState([]);
    const engWordInput = useRef();
    const ukrWordInput = useRef();
    let dataCategory = JSON.parse(localStorage.getItem('enlingo'));
    let dataWord = [];
    useEffect(()=>{
        dataWord = JSON.parse(localStorage.getItem('enlingo'));
        setArrayWord([]);
        for(let i = 0; i < dataWord.length; i++){
            if(dataWord[i].category_name===categorySelected){
                setArrayWord([...dataWord[i].words]);
                setIndexCategory(i);
                break;
            }
        }
    }, [categorySelected])
    function addNewWord(){
        const new_obj = {
            eng: engWordInput.current.value,
            translates: ukrWordInput.current.value.split()
        }
        dataCategory[indexCategory].words.push(new_obj);
        setArrayWord([...dataCategory[indexCategory].words]);
        localStorage.setItem('enlingo', JSON.stringify(dataCategory));
    }
    function deleteWord(index){
        dataCategory[indexCategory].words.splice(index, 1);  
        localStorage.setItem('enlingo', JSON.stringify(dataCategory));
        setArrayWord([...dataCategory[indexCategory].words]) 
    }
    function backToMain(){
        props.setActiveNewWord(false);
        props.setActiveCategoryPage(true);
    }
    return(
        <div className={props.activeNewWord? "adding__wrapper active": "adding__wrapper"}>
            <Link className='to-main' to={'/'} onClick={backToMain}>На головну</Link>
            <div className='title'>Оберіть категорію для додавання слів</div>
            <div className='categories-wrapper'>
                {
                    props.dataEnlingo.map(function (key, index) {
                        return (
                            <Category key={index} 
                            setEmpty={setEmpty} 
                            category={key} 
                            img={category_img[key.category_name]} 
                            categorySelected={categorySelected} 
                            setCategory={setCategorySelected} 
                            setWords={setWordsSelected} />
                        )
                    })
                }
            </div>
            {categorySelected?
                <div>
                    <div className='newword__form'>
                        <input ref={engWordInput} className="newword__input" placeholder='Додайте нове слово на англійській мові'></input>
                        <input ref={ukrWordInput} className="newword__input" placeholder='Додайте переклад цього слова на українській мові або декілька слів-синонімів'></input>
                        <button className='newword__button' onClick={addNewWord}>Додати</button>
                    </div>
                    <table className={categorySelected?'statistics__table-wrapper active':'statistics__table-wrapper'}>
                        <thead>
                            <tr>
                                <th>Слово</th>
                                <th>Переклад</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayWord?.map((item, index)=>{
                                return(
                                    <tr key={index} className='statistics__row'>
                                        <td className='statistics__word'>{item.eng}</td>
                                        <td className='statistics__right --newword-table'>{item.translates.length>1? item.translates.join(', '): item.translates}
                                        <Basket className="statistics__delete" onClick={()=>deleteWord(index)}/></td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    {arrayWord?<div className='title'>Всього в категорії {arrayWord.length} слів (слово)</div> : null}
                </div>
                : null
            }
        </div>
    )
}