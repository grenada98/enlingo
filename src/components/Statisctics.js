import React, { useEffect, useState } from 'react';

export const Statistics = (props) => {
    let userData = [];
    if(localStorage.getItem('words')){
        userData = [...JSON.parse(localStorage.getItem('words'))];
    }

    return(
        <div className={props.active? 'statistics-page': 'statistics-page active'}>
            <div className='main-page' onClick={props.setWindowActive}>Головна сторінка</div>
            <table className={props.isLocal?'statistics__table-wrapper active':'statistics__table-wrapper'}>
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
                                <td className='statistics__wrong'>{(item.right/(item.right + item.wrong)).toFixed(2)}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <div className={props.isLocal? 'notice': 'notice active'}>Ви ще не проходили навчання!</div>
        </div>
    )
}