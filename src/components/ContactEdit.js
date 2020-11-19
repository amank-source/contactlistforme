import React, { useState } from 'react'
import hitAPI from '../api'
import { useHistory } from 'react-router-dom'

function ContactEdit(props) {
  const history = useHistory()
  const [name, setName] = useState(props.name)
  const [address, setAddress] = useState(props.address)
  const [email, setEmail] = useState(props.email)
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
  const [contactType, setContactType] = useState(props.contactType)
  const { contacts, setContacts } = props

  const { addNewContact, contactID, updateFunc } = props

  return (
    <div id="edit-form" className="createContact">
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
            `https://univ-contact-book.herokuapp.com/api/contacts/${contactID}`,
            'PATCH',
            contactdata,
          )
          console.log(data.contact)
          updateFunc(data.contact)

          console.log('contact is', data)
          document.getElementById('edit-form').style.display = 'none'
        }}
      >
        Update
      </button>
    </div>
  )
}

export default ContactEdit
