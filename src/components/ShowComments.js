import React, { useState, useEffect } from 'react'
import './ShowComments.css'
import hitAPI from '../api'
import CancelIcon from '@material-ui/icons/Cancel'
import CreateNewContact from './CreateNewContact'

function ShowComments(props) {
  const { contact, contacts, setContacts, closeComments } = props
  const [commentList, setCommentList] = useState(contact.comments)

  const removeComment = (contact, deletedComment) => {
    const newContacts = [...contacts]
    const index = newContacts.indexOf(contact)
    newContacts[index].comments = newContacts[index].comments.filter(
      (comment) => comment !== deletedComment,
    )
    setContacts(newContacts)
  }

  return (
    <div id="closse-mess" className="comments">
      <CancelIcon onClick={() => closeComments(null)} />
      <h3>Comments goes here ...</h3>
      {contact.comments.length > 0 ? (
        <div className="comments-divci">
          {contact.comments.map((comment, idx) => {
            return (
              <div key={idx}>
                <p>{comment.content}</p>

                <button
                  className="button-del"
                  onClick={async () => {
                    console.log(comment.id)
                    const result = await hitAPI(
                      `https://univ-contact-book.herokuapp.com/api/comments/${comment.id}`,
                      'DELETE',
                    )
                    removeComment(contact, comment)
                  }}
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default ShowComments
