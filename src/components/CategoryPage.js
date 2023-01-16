import { Category } from './Category';
import { WordPanel } from './WordPanel';
import { ReactComponent as Fruits } from '../svg/fruits.svg';
import { ReactComponent as Kitchen } from '../svg/kitchen.svg';
import { ReactComponent as Vegetables } from '../svg/vegetables.svg';
import { ReactComponent as Animals } from '../svg/animals.svg';
import React, { useEffect, useState } from 'react';

export const CategoryPage = (props) => {
    const [categorySelected, setCategorySelected] = useState('');
    const [wordsSelected, setWordsSelected] = useState([]);
    let [empty, setEmpty] = useState(false);
    useEffect(() => {
    }, [categorySelected])
    const data = [
        {
            category_name: 'fruits',
            words: [
                {
                    eng: 'apple',
                    translates: ['яблоко', 'яблоко 2']
                },
            ]
        },
        {
            category_name: 'kitchen',
            words: [
                {
                    eng: 'fork',
                    translates: ['вилка', 'вииилка']
                },
            ]
        },
        {
            category_name: 'vegetables',
            words: [
                {
                    eng: 'tomato',
                    translates: ['помидор']
                },
                {
                    eng: 'potato',
                    translates: ['картошка']
                }
            ]
        },
        {
            category_name: 'animals',
            words: [
                {
                    eng: 'cat',
                    translates: ['кот', 'кошка']
                }
            ]
        }
    ];
    const category_img = {
        'fruits': <Fruits width='100' height='100' />,
        'kitchen': <Kitchen width='100' height='100' />,
        'vegetables': <Vegetables width='100' height='100' />,
        'animals': <Animals width='100' height='100' />
    }
    return (
        <div className={props.active ? 'categories-page active' : 'categories-page'}>
            <div className='statistics' onClick={props.setWindowActive}>Статистика</div>
            <div className='categories-wrapper'>
                {
                    data.map(function (key, index) {
                        return (
                            <Category key={index} setEmpty={setEmpty} category={key} img={category_img[key.category_name]} categorySelected={categorySelected} setCategory={setCategorySelected} setWords={setWordsSelected} />
                        )
                    })
                }
            </div>
            <WordPanel words={wordsSelected} empty={empty} setEmpty={setEmpty} />
        </div>
    )
}