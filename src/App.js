import { div } from 'prelude-ls';
import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import './App.css'
import MovieRow from './componets/MovieRow';
import FeatureMoview from './componets/FeaturedMoview';
import Header from './componets/Header';
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */


export default()=>  {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeatureData] = useState(null);
  const [blackHeader,setBlackHeader] = useState(false);

  useEffect(()  => {

const loadAll = async () => {

  //Pegando a lista Total

  let list = await Tmdb.getHomeList();
  setMovieList(list);
// Pegando featured

let originais = list.filter(i => i.slug === 'originals');
let randomChosen = Math.floor(Math.random() * (originais[0].items.results.length -1));
let chosen = originais[0].items.results[randomChosen];
let choosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
 setFeatureData(choosenInfo);

}
loadAll();

  }, []);

  useEffect(() => {
  
    const scrolListener = () => {
      if(window.scrollY > 50){
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }

    }
     window.addEventListener('scroll', scrolListener);
     return ()=> {
       window.removeEventListener('scroll',scrolListener);
     }
  },[]);
 
  return ( 
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&  
      <FeatureMoview item={featuredData} />}
      <section className="lists">
      {movieList.map((item,key)=>(
        <MovieRow key={key} title={item.title} items={item.items}/>
      ))}
      </section>
      <footer>
        Feito por Raphael<br/>
        Direitos de imagem para Netflix  <br/>
        Dados utilizados por api de Themoviedb.org
      </footer>
  
    </div>

  );
}