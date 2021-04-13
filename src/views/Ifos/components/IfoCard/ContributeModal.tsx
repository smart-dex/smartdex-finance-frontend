import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, LinkExternal } from 'uikit-sotatek'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors } from 'style/Color'

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
const [value, setValue] = useState('')
const [pendingTx, setPendingTx] = useState(false)
const { account } = useWallet()
const balance = getFullDisplayBalance(useTokenBalance(currencyAddress))

const FlexBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;
  padding: 24px 0 0 0;
`
const ButtonCancel = styled(Button)`
  color: ${({ theme }) => (theme.isDark ? darkColors.txtBlurbdark : lightColors.colorButtonCancel)} !important;
  background: ${({ theme }) => (theme.isDark ? darkColors.buttonView : lightColors.btnCancle)};
  border: none;
`
const ButtonConfirm = styled(Button)`
  background: ${baseColors.primary}; !important;
`
const LinkFooter = styled(LinkExternal)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.txtBlurbdark : lightColors.colorButtonCancel)} !important;
  width: 100%;
  margin: 10px 5px 0px 0px !important;
  background: none !important;
  grid-gap: 10px;
`
const StyledModal = styled.div`
${({ theme }) => theme.mediaQueries.nav} {
  width 551px;
}
`

return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <StyledModal> </StyledModal>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
        thousandSeparator=","
      />
      <FlexBtn>
        <ButtonCancel variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </ButtonCancel>
        <ButtonConfirm
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await contract.methods
              .deposit(new BigNumber(value).times(new BigNumber(10).pow(18)).toString())
              .send({ from: account })
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </ButtonConfirm>
      </FlexBtn>
      <LinkFooter
        href={`${process.env.REACT_APP_EXCHANGE_URL}/pool#/pools`} style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkFooter>
    </Modal>
  )
}

export default ContributeModal
