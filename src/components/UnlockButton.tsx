import React from 'react'
import styled from 'styled-components'
import { baseColors } from 'style/Color'
import { Button, useWalletModal } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const ButtonStyle = styled(Button)`
  background: ${ baseColors.primary};
  color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 4px 10px  rgba(83, 185, 234, 0.24);
  height: 45px;
  font-weight: 600;
  font-size: 13px;
  position: relative;
  padding-right: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    height: 56px;
  }
`
const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <ButtonStyle onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </ButtonStyle>
  )
}

export default UnlockButton
