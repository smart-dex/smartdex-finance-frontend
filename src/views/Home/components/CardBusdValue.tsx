import React from 'react'
import { lightColors } from 'style/Color'
import CardValue, { CardValueProps } from './CardValue'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return <CardValue fontSize="12px" color={lightColors.balanceColor} prefix="~$" bold={false} decimals={2} {...props} />
}

export default CardBusdValue
