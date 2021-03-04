import React from 'react'
import CardValue, { CardValueProps } from './CardValue'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return <CardValue fontSize="12px" color="#5F5E76" prefix="~$" bold={false} decimals={2} {...props} />
}

export default CardBusdValue
