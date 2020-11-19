import React, { useState } from 'react'
import './CreateNewContact.css'
import { useHistory } from 'react-router-dom'
import hitAPI from '../api'

function CreateNewContact(props) {
  const history = useHistory()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [contactType, setContactType] = useState('')
  const { contacts, setContacts } = props

  const { addNewContact } = props

  return (
    <div className="createContact">
      <h1>Create New Contact</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>Contact Name:</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />

        <h3>Adress:</h3>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
        />

        <h3>Email Adress:</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <h3>Phone Number:</h3>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
        />
        <h3>Contact Type</h3>
        <input
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
          type="text"
          placeholder="work"
        />
      </form>
      <button
        onClick={async () => {
          console.log('hi')

          const contactdata = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            contactType: contactType,
          }

          const data = await hitAPI(
            'https://univ-contact-book.herokuapp.com/api/contacts',
            'POST',
            contactdata,
          )
          addNewContact(data.contact)
          console.log('contact is', data)
          history.push('/mycontacts')
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default CreateNewContact
