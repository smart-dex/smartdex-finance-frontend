import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const ButtonStyle = styled(Button)`
  background: #0085ff;
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  border-radius: 10px;
  padding: 18px;
  &:hover:not(:disabled):not(:active) {
    background-color: #40aaff !important;
  }
  margin-top: 10px;
  margin-bottom: 10px;
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
