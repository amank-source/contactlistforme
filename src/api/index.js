import React from 'react'
const url = 'https://univ-contact-book.herokuapp.com/api/contacts'

const hitAPI = async (url, method = 'GET', sendData = null) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtYW5rIiwiaWF0IjoxNjA1NTc0OTg0LCJleHAiOjE2MDYxNzk3ODR9._JxSe5XmB49X22u5dVgqJG9epjtygs3x5mRUpHH-tmE',
    },
  }

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData)
  }

  const response = await fetch(url, fetchOptions)
  const data = await response.json()

  return data
}
export default hitAPI
