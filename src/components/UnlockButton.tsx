import React from 'react'
import styled from 'styled-components'
import { baseColors, darkColors, lightColors } from 'style/Color'
import { Button, useWalletModal } from 'smartdex-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import useAuth from '../hooks/useAuth'

const ButtonStyle = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? darkColors.buttonView : lightColors.buttonView)};
  box-shadow: 0px 4px 10px ${ ({ theme}) => theme.isDark ? darkColors.boxShadow : lightColors.boxShadow}; 
  color: ${baseColors.primary};
  border-radius: 10px;
  height: 45px;
  font-weight: 600;
  font-size: 13px;
  position: relative;
  padding-right: 24px;
  box-shadow: none;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    height: 56px;
  }
`
const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { reset } = useWallet()
  const { login } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, reset)

  return (
    <ButtonStyle onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')} 
    </ButtonStyle>
  )
}

export default UnlockButton