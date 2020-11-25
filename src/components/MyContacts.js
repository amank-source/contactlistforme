import React, { useState, Fragment } from 'react'
import './MyContact.css'
import hitAPI from '../api'
import ContactEdit from './ContactEdit'
import Comment from './Comment'
import ShowComments from './ShowComments'

function MyContacts(props) {
  const { contacts, setContacts, updateFunc, alphaOrder } = props
  const [isEdit, setIsEdit] = useState(null)
  const [wantToComment, setWantToComment] = useState(null)
  const [comment, setcomment] = useState(false)

  console.log(contacts)
  return (
    <div className="mycontacts">
      {alphaOrder(contacts)}

      {contacts.map((contact, idx) => {
        return (
          <div className="contact-card" key={idx}>
            <div className="card-title">
              <h2>
                Name: {contact.name}
                <span>{`(${contact.contactType})`}</span>
              </h2>
            </div>
            <div className="contact-info">
              <h4> Adress: {contact.address}</h4>
              <h4>Email: {contact.email}</h4>
              <h4>Phone Number : {contact.phoneNumber}</h4>

              {isEdit === contact.id ? (
                <ContactEdit
                  name={contact.name}
                  address={contact.address}
                  email={contact.email}
                  phoneNumber={contact.phoneNumber}
                  contactID={contact.id}
                  updateFunc={updateFunc}
                  contacts={contacts}
                  setContacts={setContacts}
                  closeEdit={() => setIsEdit(null)}
                />
              ) : null}

              {wantToComment === contact.id ? (
                <Comment
                  contactID={contact.id}
                  contacts={contacts}
                  setContacts={setContacts}
                  handleFinish={() => setWantToComment(null)}
                />
              ) : null}

              {comment === contact.id ? (
                <ShowComments
                  contact={contact}
                  setContacts={setContacts}
                  contacts={contacts}
                  closeComments={() => setcomment(null)}
                />
              ) : null}

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
                  Make A Comment
                </button>

                {contact.comments && contact.comments.length > 0 ? (
                  <button
                    className="view-button"
                    onClick={() => setcomment(contact.id)}
                  >
                    View Comments
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyContacts
