import React, { useEffect, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { CategoryPage } from './CategoryPage';

export const Statistics = (props) => {
    let userData = [];
    if(localStorage.getItem('words')){
        userData = [...JSON.parse(localStorage.getItem('words'))];
    }

    return(
        <div className={props.activeStatistics? 'statistics-page active': 'statistics-page'}>
            <Link className='main-page' 
                onClick={props.setCategoryPageActive} to="/"
            >Головна сторінка</Link>
            {props.isLocal?<table className='statistics__table-wrapper'>
                <thead>
                    <tr>
                        <th>Слово</th>
                        <th>Кількість правильних відповідей</th>
                        <th>Кількість неправильних відповідей</th>
                        <th>Відсоток правильних</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((item, index)=>{
                        return(
                            <tr key={index} className='statistics__row'>
                                <td className='statistics__word'>{item.name}</td>
                                <td className='statistics__right'>{item.right}</td>
                                <td className='statistics__wrong'>{item.wrong}</td>
                                <td className='statistics__wrong'>{(item.right/(item.right + item.wrong)*100)}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>:
                    <div className='notice'>Ви ще не проходили навчання!</div>
            }
            <Routes>
                <Route path="/" element={<CategoryPage/>}/>
            </Routes>
        </div>
    )
}