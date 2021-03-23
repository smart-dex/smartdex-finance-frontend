import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { baseColors } from '../style/Color'

const ButtonStyle = styled(Button)`
  background: ${baseColors.primary};
  border-radius: 10px;
  &:hover {
    background: #5ba7ec !important;
  }
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
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
