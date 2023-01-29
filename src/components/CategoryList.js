import React from "react";
import { Category } from './Category';

export const CategoryList = (props) =>{
    return(
        <div className='categories-wrapper'>
        {
            props.dataEnlingo.map(function (key, index) {
                return (
                    <Category key={index} 
                        setEmpty={props.setEmpty} 
                        category={key} 
                        img={props.img[key.category_name]} 
                        categorySelected={props.categorySelected} 
                        setCategory={props.setCategory} 
                        setWords={props.setWords} />
                )
            })
        }
    </div>
    )
}