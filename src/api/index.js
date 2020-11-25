import React from 'react'

const hitAPI = async function fetchAPI(url, method = 'GET', sendData = null) {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFybWFuIiwiaWF0IjoxNjA2Mjc1NjMyLCJleHAiOjE2MTE0NTk2MzJ9.BBuHlpHz_tXCRmqGSVp1V90hDzXktyje75qJiX6DnZ0',
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
