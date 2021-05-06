import React from 'react'
import styled from 'styled-components'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'

const CoreTag = () => {
  const TranslateString = useI18n()
  return (
    <StyledCoreTag outline startIcon={<VerifiedIcon />}>
      {TranslateString(522, 'Core')}
    </StyledCoreTag>
  )
}

const CommunityTag = () => {
  const TranslateString = useI18n()
  return (
    <StyledCoreCommunity variant="textSubtle" outline startIcon={<CommunityIcon />}>
      {TranslateString(520, 'Community')}
    </StyledCoreCommunity>
  )
}

const BinanceTag = () => (
  <Tag variant="binance" outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)
const StyledCoreTag = styled(Tag)`
  border: 2px solid rgba(255, 161, 78, 0.5);
  border-radius: 20px;
  color: #ffa14e;
  svg {
    fill: #ffa14e;
  }
`
const StyledCoreCommunity = styled(Tag)`
  border: 1px solid #e2e2e8;
  border-radius: 20px;
  color: #5f5e76;
  svg {
    fill: #5f5e76;
  }
`
export { CoreTag, CommunityTag, BinanceTag }
