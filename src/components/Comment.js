import React, { useState } from 'react'
import './Comment.css'
import hitAPI from '../api'

function Comment(props) {
  const { contactID, contacts, setContacts, handleFinish } = props
  const [textValue, setTextValue] = useState('')
  return (
    <div id="comment-form" className="comment-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          valu={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button
          onClick={async () => {
            console.log(contactID)

            const result = await hitAPI(
              `https://univ-contact-book.herokuapp.com/api/contacts/${contactID}/comments`,
              'POST',
              { content: textValue },
            )

            const contactCopy = contacts.map((contact) => {
              if (contact.id === contactID) {
                contact.comments.push(result.comment)
              }

              return contact
            })

            setTextValue('')
            handleFinish()
            setContacts(contactCopy)
          }}
        >
          Send
        </button>
        <button onClick={() => handleFinish()}>Cancel</button>
      </form>
    </div>
  )
}

export default Comment
