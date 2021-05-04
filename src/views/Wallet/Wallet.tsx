import React, { useState, useEffect } from 'react'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import { lightColors} from 'style/Color'
import { Text } from 'smartdex-uikit'


const StyledWallet = styled.div`
  margin-top: 0px;
  position: relative;
`
const BoxIconDirect = styled.div`
  position: relative;
  height: calc(100vh - 150px);
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url(/images/home/Subtract.png);
  background-size: 100% 64%;
  background-position: top;
  background-repeat: no-repeat;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 100%;
    background-size: 100% 70%;
  }
`
const TextComing = styled(Text)`
  color: ${lightColors.textIfolight};
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: -0.04em;
  z-index: 100;
  `

const IconDirect = styled.img`
  max-width: 100%;
  text-align: center;
  z-index: 100;

`
const Wallet: React.FC = () => {
  
  return (
    <StyledWallet>
      <BoxIconDirect>
        <IconDirect src="/images/home/icon-center.png" alt="" />
        <TextComing as="p">Coming Soon</TextComing>
      </BoxIconDirect>
     
    </StyledWallet>
  )
}

export default Wallet
