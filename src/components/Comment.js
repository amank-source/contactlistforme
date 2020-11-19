import React, { useState } from 'react'
import './Comment.css'

function Comment() {
  const [textValue, setTextValue] = useState('')
  return (
    <div className="comment-form">
      <form>
        <textarea />
        <button>Send</button>
        <button>Cancel</button>
      </form>
    </div>
  )
}

export default Comment
