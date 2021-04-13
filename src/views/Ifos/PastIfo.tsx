import React from 'react'
import { ifosConfig } from 'config/constants'
import IfoCardPast from './components/IfoCardPast'
import IfoCards from './components/IfoCards'


const PastIfo = () => {
  return (
    <IfoCards>
      {ifosConfig.map((ifo) => (
        <IfoCardPast key={ifo.id} ifo={ifo} />
      ))}
    </IfoCards>
  )
}

export default PastIfo
