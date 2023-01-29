import { WordPanel } from './WordPanel';
import React, { useEffect, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Statistics } from './Statisctics';
import { NoFoundPage } from './NoFoundPage';
import { NewWord } from './NewWord';
import { category_img } from './CategoryImg';
import { CategoryList } from './CategoryList';

export const CategoryPage = (props) => {
    const [categorySelected, setCategorySelected] = useState(''); //выбранная категория
    const [wordsSelected, setWordsSelected] = useState([]); //слова с выбранной категории
    let [empty, setEmpty] = useState(false); //все ли слова пройдены
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
            <CategoryList 
                dataEnlingo={dataEnlingo}
                setEmpty={setEmpty} 
                img={category_img} 
                categorySelected={categorySelected} 
                setCategory={setCategorySelected} 
                setWords={setWordsSelected}/>
            {categorySelected.length>0&&wordsSelected.length>0? <WordPanel words={wordsSelected} empty={empty} setEmpty={setEmpty} />: null}
            {categorySelected.length>0&&wordsSelected.length<1 ?<div className='categories-page__no-words'>В цій категорії ще не додано слів!</div>: null}
            <Routes>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/add-words" element={<NewWord/>}/>
            </Routes>
        </div>
    )
}