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

  const [searchTerm, setSearchTerm] = useState('')
  const [isRecent, setIsRecent] = useState(false)

  const addNewContact = (contact) => {
    contact.comments = contact.comments || []
    setContacts([contact, ...contacts])
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

  function filteredcontacts() {
    const contactsFilteredBySearchTerm = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const recentContact = contactsFilteredBySearchTerm.filter((contact) => {
      if (!isRecent) {
        return true
      }

      const postTime = Date.parse(contact.createdAt)
      const nowTime = Date.now()
      const THREE_HOURS = 1000 * 60 * 60 * 3

      return postTime + THREE_HOURS >= nowTime
    })

    return recentContact.reverse()
  }

  function alphaOrder(contactList) {
    contactList.sort((a, b) => {
      let fa = a.name.toLowerCase()
      let fb = b.name.toLowerCase()
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })
  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/createcontact">
            <Header
              contacts={contacts}
              setContacts={setContacts}
              searchTerm={setSearchTerm}
              setSearchTerm={setSearchTerm}
              isRecent={isRecent}
              setIsRecent={setIsRecent}
            />
            <CreateNewContact
              addNewContact={addNewContact}
              setContacts={setContacts}
              contacts={contacts}
            />
          </Route>
          <Route path="/mycontacts">
            <Header
              contacts={contacts}
              setContacts={setContacts}
              searchTerm={setSearchTerm}
              setSearchTerm={setSearchTerm}
              isRecent={isRecent}
              setIsRecent={setIsRecent}
            />
            <MyContacts
              contacts={filteredcontacts()}
              setContacts={setContacts}
              updateFunc={updateFunc}
              alphaOrder={alphaOrder}
            />
          </Route>

          <Route path="/">
            <Header
              contacts={contacts}
              setContacts={setContacts}
              searchTerm={setSearchTerm}
              setSearchTerm={setSearchTerm}
              isRecent={isRecent}
              setIsRecent={setIsRecent}
            />
            <MyContacts
              contacts={filteredcontacts()}
              setContacts={setContacts}
              alphaOrder={alphaOrder}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
