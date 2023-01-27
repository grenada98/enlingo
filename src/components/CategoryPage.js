import { Category } from './Category';
import { WordPanel } from './WordPanel';
import React, { useEffect, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Statistics } from './Statisctics';
import { NoFoundPage } from './NoFoundPage';
import { NewWord } from './NewWord';
import { category_img } from './CategoryImg';

export const CategoryPage = (props) => {
    const [categorySelected, setCategorySelected] = useState('');
    const [wordsSelected, setWordsSelected] = useState([]);
    let [empty, setEmpty] = useState(false);
    const dataEnlingo = JSON.parse(localStorage.getItem('enlingo'));

    return (
        <div className={props.activeCategoryPage ? 'categories-page active' : 'categories-page'}>
            <div className='route-pages'>
                <Link className='statistics' 
                    onClick={props.setStatisticsPageActive}
                    to="/statistics"
                    >Статистика</Link>
                <div className='add-words' onClick={props.setNewWordPageActive}>Додати слова</div>
            </div>
            <div className='title'>Оберіть категорію</div>
            <div className='categories-wrapper'>
                {
                    dataEnlingo.map(function (key, index) {
                        return (
                            <Category key={index} setEmpty={setEmpty} category={key} img={category_img[key.category_name]} categorySelected={categorySelected} setCategory={setCategorySelected} setWords={setWordsSelected} />
                        )
                    })
                }
            </div>
            {wordsSelected.length>0? <WordPanel words={wordsSelected} empty={empty} setEmpty={setEmpty} />:
            <div>В цій категорії ще не додано слів!</div>}
            <Routes>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/add-words" element={<NewWord/>}/>
            </Routes>
        </div>
    )
}