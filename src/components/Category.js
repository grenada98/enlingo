import React, { useState } from 'react';

export const Category = (props) => {
    function onHandle() {
        props.setCategory(props.category.category_name);
        props.setWords([...props.category.words])
        props.setEmpty(false);
    }
    return (
        <div className={props.categorySelected == props.category.category_name ? 
        'category__container active' : 'category__container'} 
        onClick={onHandle} >
            {props.img ?(
                <div className='category__img_wrapper'>
                    {props.img}
                </div>
                ) : null
            }
            <div className='category__title'>{props.category.category_name}</div>
        </div>
    )
}