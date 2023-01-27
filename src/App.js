import './App.scss';
import { CategoryPage } from './components/CategoryPage';
import { Statistics } from './components/Statisctics';
import { NewWord } from './components/NewWord';
import React, { useEffect, useState } from 'react';

function App() {
  const [activeCategoryPage, setActiveCategoryPage] = useState(true); //страница категорий
  const [isLocal, setIsLocal] = useState(false); //есть ли статистика слов
  const [activeNewWord, setActiveNewWord] = useState(false); //страница добавления слов
  const [activeStatistics, setActiveStatistics] = useState(false); //страница статистики
  const data = [ //база данных для изначальной инициализации, если еще не добавляли/не запускали программу
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
  if(!localStorage.getItem('enlingo')) {
    localStorage.setItem('enlingo', JSON.stringify(data));
  }
  const dataEnlingo = JSON.parse(localStorage.getItem('enlingo'));

  function setStatisticsPageActive() {
    if (localStorage.getItem("words")) {
      setIsLocal(true)
    }
    else {
      setIsLocal(false)
    }
    setActiveCategoryPage(false);
    setActiveStatistics(true);
  }


  function setCategoryPageActive() {
    setActiveCategoryPage(true);
    setActiveStatistics(false);
  }

  function setNewWordPageActive(){
    setActiveNewWord(true);
    setActiveCategoryPage(false);
  }


  return (
    <div className="App">
      <NewWord 
        activeNewWord={activeNewWord}
        setActiveNewWord={setActiveNewWord}
        setActiveCategoryPage={setActiveCategoryPage}
        dataEnlingo={dataEnlingo} />
      <CategoryPage
        dataEnlingo={dataEnlingo}
        activeNewWord={activeNewWord}
        setActiveNewWord={setActiveNewWord}
        activeCategoryPage={activeCategoryPage}
        setActiveCategoryPage={setActiveCategoryPage}
        activeStatistics={activeStatistics}
        setStatisticsPageActive={setStatisticsPageActive}
        isLocal={isLocal}
        setIsLocal={setIsLocal}
        setNewWordPageActive={setNewWordPageActive} />
      <Statistics
        activeCategoryPage={activeCategoryPage}
        isLocal={isLocal}
        setIsLocal={setIsLocal}
        setCategoryPageActive={setCategoryPageActive}
        activeStatistics={activeStatistics} />
    </div>
  );
}

export default App;
