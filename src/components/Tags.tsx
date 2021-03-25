import React from 'react'
import styled from 'styled-components'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon } from 'uikit-sotatek'

const CoreTag = () => (
  <StyledCoreTag outline startIcon={<VerifiedIcon />}>
    Core
  </StyledCoreTag>
)

const CommunityTag = () => (
  <StyledCoreCommunity variant="textSubtle" outline startIcon={<CommunityIcon />}>
    Community
  </StyledCoreCommunity>
)

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
const StyledCoreCommunity =styled(Tag)`
border: 1px solid #E2E2E8;
border-radius: 20px;
color: #5F5E76;
svg {
  fill: #5F5E76;
}
`
export { CoreTag, CommunityTag, BinanceTag }
