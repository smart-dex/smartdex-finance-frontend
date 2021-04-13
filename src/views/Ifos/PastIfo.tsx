import React from 'react'
import { ifosConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import IfoCardPast from './components/IfoCardPast'
import IfoCards from './components/IfoCards'

const inactiveIfo: Ifo[] = ifosConfig.filter((ifo) => !ifo.isActive)

const PastIfo = () => {
  return (
    <IfoCards>
      {inactiveIfo.map((ifo) => (
        <IfoCardPast key={ifo.id} ifo={ifo} />
      ))}
    </IfoCards>
  )
}

export default PastIfo
