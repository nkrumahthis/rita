import React from 'react'
import FullAssistant from './FullAssistant'
import { requestEphemeralKey } from './actions'

async function page() {

  return (
    <main>
      <FullAssistant />
    </main>
  )
}

export default page