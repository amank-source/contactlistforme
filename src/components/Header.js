import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import './Header.css'

function Header(props) {
  const { searchTerm, setSearchTerm, isRecent, setIsRecent } = props
  return (
    <nav className="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src=" https://i.imgur.com/MkZ7hv1.jpg"
          alt="logo image"
        />
      </Link>
      <div className="header-search">
        <label className="header-checkbox">
          <input
            type="checkbox"
            checked={isRecent}
            onChange={() => setIsRecent(!isRecent)}
          />
          Recent Only
        </label>
        <input
          type="text"
          className="header_searchInput"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <SearchIcon className="header-searchIcon" />
      </div>

      <div className="header-nav">
        <Link style={{ textDecoration: 'none' }} to="/mycontacts">
          <span className="linkss">My ContactList</span>
        </Link>
      </div>

      <div className="header-nav">
        <Link style={{ textDecoration: 'none' }} to="/createcontact">
          <span className="linkss">Create New Contact</span>
        </Link>
      </div>
    </nav>
  )
}

export default Header
