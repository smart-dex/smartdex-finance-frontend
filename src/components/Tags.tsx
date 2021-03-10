import React from 'react'
import styled from 'styled-components'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon } from 'uikit-sotatek'

const CoreTag = () => (
  <StyledCoreTag outline startIcon={<VerifiedIcon/>}>
    Core
  </StyledCoreTag>
)

const CommunityTag = () => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon />}>
    Community
  </Tag>
)

const BinanceTag = () => (
  <Tag variant="binance" outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)
const StyledCoreTag = styled(Tag)`
    border: 2px solid rgba(255, 161, 78, 0.5);
    border-radius: 16px;
    color: #FFA14E;
    svg{
      fill:#FFA14E;
    }

`
export { CoreTag, CommunityTag, BinanceTag }
