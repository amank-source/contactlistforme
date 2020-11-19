import React, { useState } from 'react'
import './MyContact.css'
import hitAPI from '../api'
import ContactEdit from './ContactEdit'
import Comment from './Comment'

function MyContacts(props) {
  const { contacts, setContacts, updateFunc } = props
  const [isEdit, setIsEdit] = useState('')
  const [wantToComment, setWantToComment] = useState('')
  console.log(contacts)
  return (
    <div className="mycontacts">
      {contacts.map((contact, idx) => {
        return (
          <div className="contact-card" key={idx}>
            <div className="card-title">
              <h2>{contact.name}</h2>
            </div>
            <div className="contact-info">
              <h4>{contact.address}</h4>
              <h4>{contact.email}</h4>
              <h4>{contact.phoneNumber}</h4>
              {isEdit === contact.id ? (
                <ContactEdit
                  name={contact.name}
                  address={contact.address}
                  email={contact.email}
                  phoneNumber={contact.phoneNumber}
                  contactID={contact.id}
                  updateFunc={updateFunc}
                  contact={contacts}
                  setContacts={setContacts}
                />
              ) : null}

              {wantToComment === contact.id ? <Comment /> : null}
              <div className="contact-buttons">
                <button
                  onClick={async () => {
                    try {
                      const delCont = await hitAPI(
                        `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}`,
                        'DELETE',
                      )
                      const result = contacts.filter((del) => contact !== del)

                      setContacts(result)
                    } catch (error) {
                      console.log(error)
                    }
                  }}
                >
                  Delete
                </button>
                <button onClick={() => setIsEdit(contact.id)}>Edit</button>
                <button onClick={() => setWantToComment(contact.id)}>
                  Comments
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyContacts
