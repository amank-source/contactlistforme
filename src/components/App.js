import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './Header'
import CreateNewContact from './CreateNewContact'
import MyContacts from './MyContacts'
import hitAPI from '../api'
import ContactEdit from './ContactEdit'

function App() {
  const [contacts, setContacts] = useState([])
  const addNewContact = (addContact) => {
    return setContacts([addContact, ...contacts])
  }

  useEffect(() => {
    const getContacts = async () => {
      const data = await hitAPI(
        'https://univ-contact-book.herokuapp.com/api/contacts',
        'GET',
      )

      setContacts(data.contacts)
      console.log('data is', data)
    }
    getContacts()
  }, [])
  const updateFunc = (updateContact) => {
    let index = contacts.findIndex((cont) => {
      return cont.index === updateContact.index
    })
    if (index > -1) {
      const contactCopy = [...contacts]
      contactCopy[index] = updateContact
      setContacts(contactCopy)
    }
  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/createcontact">
            <Header />
            <CreateNewContact
              addNewContact={addNewContact}
              setContacts={setContacts}
              contacts={contacts}
            />
          </Route>
          <Route path="/mycontacts">
            <Header />
            <MyContacts
              contacts={contacts}
              setContacts={setContacts}
              updateFunc={updateFunc}
            />
          </Route>

          <Route path="/">
            <Header />
            <MyContacts contacts={contacts} setContacts={setContacts} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
