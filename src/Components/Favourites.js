import React, { Component } from 'react'
import { movies } from './GetMovies'

export default class Favourites extends Component {
  constructor(){
    super();
    this.state={
      genre:[],
      currGenre:'All Genres',
      movies:[],
      currText:'',
      limit:5,
      currpage:1,
    }
  }
  componentDidMount(){
    let genreids={28:'Action',12: 'Adventure',16: 'Animation',35: 'Comedy',80: 'Crime',
    18: 'Drama',27: 'Horror',
    10402: 'Music',10749: 'Romance',
    53:'Thriller'}
    let data= JSON.parse(localStorage.getItem('movies-app')||"[]")
    const movie= movies.results

    let temp=[];
    data.forEach((movieobj)=>{
      if(!temp.includes(genreids[movieobj.genre_ids[0]])){
        temp.push(genreids[movieobj.genre_ids[0]])
      }
    })
    temp.unshift('All Genres');
    this.setState({
      genre:[...temp],
      movies:[...data]
    })
  }
    handleGerneChange=(genre)=>{
      this.setState({
        currGenre:genre,
      })
    }

    sortPopularittyDec=()=>{
      let temp= this.state.movies;
      temp.sort(function(objA,objB) {
        return objB.popularity-objA.popularity
      })
      this.setState({
        movies:[...temp]
      })
    }
    sortPopularittyInc=()=>{
      let temp= this.state.movies;
      temp.sort(function(objA,objB) {
        return objA.popularity-objB.popularity
      })
      this.setState({
        movies:[...temp]
      })
    }
    sortRatingDec=()=>{
      let temp= this.state.movies;
      temp.sort(function(objA,objB) {
        return objB.vote_average-objA.vote_average
      })
      this.setState({
        movies:[...temp]
      })
    }
    sortRatingInc=()=>{
      let temp= this.state.movies;
      temp.sort(function(objA,objB) {
        return objA.vote_average-objB.vote_average
      })
      this.setState({
        movies:[...temp]
      })
    }

    handleFavrouriteState=()=>{
      let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
      let temp= oldData.map((movie)=>movie.id);
      this.setState({
          Favrourite:[...temp]
      })
  }

  
  handlepagination=(page)=>{
    this.setState({
      currpage:page,
    })
  }

  handleDelete=(id)=>{
    let newarr=[];
    newarr=this.state.movies.filter((movieobj)=>movieobj.id!=id)
    this.setState({
      movies:[...newarr]
    })
    localStorage.setItem("movies-app",JSON.stringify(newarr))
  }

  render() {
    let genreids={28:'Action',12: 'Adventure',16: 'Animation',35: 'Comedy',80: 'Crime',
    18: 'Drama',27: 'Horror',
    10402: 'Music',10749: 'Romance',
    53:'Thriller'}

    let filterarr=[];

 
    if (this.state.currText=='') {
      filterarr=this.state.movies
   } else {
    filterarr=this.state.movies.filter((movieobj)=>{
      let title=movieobj.original_title.toLowerCase();
      return title.includes(this.state.currText.toLowerCase())
    })
   } 

   if (this.state.currGenre!="All Genres") {
    filterarr=this.state.movies.filter((movieobj)=>genreids[movieobj.genre_ids[0]]==this.state.currGenre)


    
  }
  let pages= Math.ceil(filterarr.length/this.state.limit);
  let pagearr=[];
  for(let i=1; i<=pages;i++){
    pagearr.push(i);
  }
  let si=(this.state.currpage-1)*this.state.limit
  let ei=si+this.state.limit;
  filterarr=filterarr.slice(si,ei);
    return (
      <>
      <div className="main">
        <div className="row">
                <div className="col-lg-3 col-sm-12">
                <ul className="list-group faviourites-list">{
                  this.state.genre.map((genre)=>(
                   genre==this.state.currGenre?<li className="list-group-item" style={{color:'white', backgroundColor:'#1258b6', fontWeight:'bold'}} >{genre}</li>
                   : <li className="list-group-item" style={{color:'#1258b6', backgroundColor:'white'}} onClick={()=>this.handleGerneChange(genre)}>{genre}</li>
                ))}
                </ul>
                </div>
                <div className="col-lg-9 faviourites-table col-sm=12"> 
                 <div className="row ">
                        
                        <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                        <input type="number" className='input-group-text col' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}  />
                        </div>
                        <div className="row">
                            <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fa-solid fa-sort-up" onClick={this.sortPopularittyDec}></i> Popularities <i className="fa-solid fa-sort-down" onClick={this.sortPopularittyInc}></i></th>
                                        <th scope="col"><i className="fa-solid fa-sort-up" onClick={this.sortRatingDec}></i> Rating <i className="fa-solid fa-sort-down" onClick={this.sortRatingInc}></i></th>
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        filterarr.map((movieobj)=>(
                                          <tr>
                                          <td > <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}` } style={{width:'10vw'}} alt={movieobj.original_title} /> <strong>{movieobj.original_title}</strong></td>
                                          <td>{genreids[movieobj.genre_ids[0]]} {genreids[movieobj.genre_ids[1]]}</td>
                                          <td>{movieobj.popularity}</td>
                                          <td>{movieobj.vote_average}</td>
                                          <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieobj.id)} >Delete</button></td>
                                          </tr>
                                        ))
                                      }
                                    </tbody>
                            </table>
                        </div>
                        <div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                  {
                                    pagearr.map((page)=>(
                                      <li className="page-item"><a className="page-link" onClick={()=>this.handlepagination(page)}>{page}</a></li>
                                    ))
                                  }
                                    
                                </ul>
                            </nav>
                        </div>
                </div>
                </div>
                </div>
       
      
      </>
    )
  }
}
