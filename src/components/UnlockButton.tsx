import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal, Link} from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from 'style/Color'
import { ButtonPrimary} from '../style/Button'



const ButtonStyle = styled(Button)`
  background-color: ${({ theme }) => (theme.isDark ? darkColors.blackIfo : lightColors.lightbt)} !important;
  border-radius: 10px;
   margin-top: 10px;
  margin-bottom: 10px;
  margin-right:5px;
  color: #0085FF !important;
  position: relative;  
  box-shadow: 0px 4px 10px rgba(239, 239, 239, 0.24) !important;  
`
const LinkPrimary = styled(Link)`
  ${ButtonPrimary}
  border-radius:28px;
  border-radius: 0px 10px 10px 0px;
  position: absolute;
  right: -17px;
  padding: 0 10px;
  &:hover{
    opacity:0.5;
  }
`


const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <ButtonStyle onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}  
      <LinkPrimary href="" mr="16px">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1549 0.0962113L0.785925 5.34348C-0.525754 5.9557 -0.0885275 7.87961 1.31065 7.87961H6.12069V12.6896C6.12069 14.0888 8.0446 14.5263 8.65682 13.2144L13.9041 1.84539C14.3413 0.795664 13.2044 -0.341289 12.1549 0.0962113Z" fill="white"/>
            </svg>

            </LinkPrimary>
    </ButtonStyle>
  )
}

export default UnlockButton
