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
                    translates: ['яблуко']
                },
            ]
        },
        {
            category_name: 'kitchen',
            words: [
                {
                    eng: 'fork',
                    translates: ['виделка']
                },
            ]
        },
        {
            category_name: 'vegetables',
            words: [
                {
                    eng: 'tomato',
                    translates: ['помідор']
                },
                {
                    eng: 'potato',
                    translates: ['картопля']
                }
            ]
        },
        {
            category_name: 'animals',
            words: [
                {
                    eng: 'cat',
                    translates: ['кіт', 'кішка']
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
            <div className='add-words'>Додати слова</div>
            <div className='select-category'>Оберіть категорію</div>
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