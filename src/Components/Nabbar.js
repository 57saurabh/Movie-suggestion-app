import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Nabbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'0.5'}}>
            <nav className="navbar  bg-light">
                  <div className="container-fluid">
                    <Link to='/' style={{textDecoration:'none', color:'#1258b6'}} className="navbar-brand fs-1 fw-bold" >MOVIES APP</Link>
                   
                    <div className="navbar"  style={{display:'flex'}}>
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link  to='/' style={{textDecoration:'none', color:'#1258b6'}} className="nav-link fw-bold" aria-current="page" >Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/favourites" style={{textDecoration:'none', color:'#1258b6'}} className="nav-link fw-bold" >Favourites</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
            </nav>
        </div>
    )
  }
}
