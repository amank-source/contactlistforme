import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import './Header.css'

function Header() {
  return (
    <nav className="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src=" https://i.imgur.com/A1OlZmC.png"
          alt="logo image"
        />
      </Link>
      <div className="header-search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header-searchIcon" />
      </div>

      <div className="header-nav">
        <Link to="/mycontacts">
          <span>My ContactList</span>
        </Link>
      </div>

      <div className="header-nav">
        <Link to="/createcontact">
          <span>Create New Contact</span>
        </Link>
      </div>
    </nav>
  )
}

export default Header
