import React, { useEffect, useState, useRef } from 'react';
import { Category } from './Category';
import { category_img } from './CategoryImg';
import {ReactComponent as Basket} from '../svg/basket.svg'
import {Routes, Route, Link} from 'react-router-dom';
import { CategoryList } from './CategoryList';

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
            eng: engWordInput.current.value.toLowerCase(),
            translates: ukrWordInput.current.value.toLowerCase().split()
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
        <>
            {props.activeNewWord?
            <div className="adding__wrapper">
                <div className='route-pages'>
                    <Link className='to-main' to={'/'} onClick={backToMain}>На головну</Link>
                </div>
                <span className='title'>Оберіть категорію для додавання слів</span>
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
                    <div className='newword__wrapper'>
                        <div className='newword__form'>
                            <input ref={engWordInput} className="newword__input" placeholder='Додайте нове слово на англійській мові'></input>
                            <input ref={ukrWordInput} className="newword__input" placeholder='Додайте переклад цього слова на українській мові або декілька слів-синонімів'></input>
                            <button className='newword__button' onClick={addNewWord}>Додати</button>
                        </div>
                        {arrayWord.length?
                            <>
                                <table className='vocabulary__table-wrapper'>
                                    <thead>
                                        <tr className='vocabulary__row'>
                                            <th className='vocabulary__eng'>Слово</th>
                                            <th className='vocabulary__ukr'>Переклад</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrayWord.map((item, index)=>{
                                            return(
                                                <tr key={index} className='vocabulary__row'>
                                                    <td className='vocabulary__word'>{item.eng}</td>
                                                    <td className='vocabulary__right'>{item.translates.length>1? item.translates.join(', '): item.translates}
                                                    <Basket className="vocabulary__delete" onClick={()=>deleteWord(index)}/></td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                                <div className='title'>Всього в категорії {arrayWord.length} слів (слово)</div>
                            </>
                            : null}
                    </div>
                    : null
                }
            </div> : null}
        </>
    )
}