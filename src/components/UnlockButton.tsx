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
  width: 147px;
  height: 45px;
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  font-size: 13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 170px;
    height: 56px;
    font-size: 16px;
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
