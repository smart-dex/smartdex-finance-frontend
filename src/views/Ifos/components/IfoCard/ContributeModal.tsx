import React, { useState, useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, LinkExternal } from 'uikit-sotatek'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
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
const TranslateString = useI18n()

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

const handleChange = useCallback(
  (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      const data = e.currentTarget.value.replaceAll(',','')
      setValue(data)
    } else {
      setValue('')
    }
  },
  [setValue],
)

return (
    <Modal title={`${TranslateString(1231, "Contribute")} ${currency}`} onDismiss={onDismiss}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
      <StyledModal> </StyledModal>
      <BalanceInput
        value={value}
        onChange={handleChange}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
        thousandSeparator=","
      />
      <FlexBtn>
        <ButtonCancel variant="secondary" onClick={onDismiss} mr="8px">
        {TranslateString(1232, "Cancel")}
         
        </ButtonCancel>
        <ButtonConfirm
          disabled={pendingTx || Number(balance) === 0 || Number(value) > Number(balance) || Number(value) === 0}
          onClick={async () => {
            setPendingTx(true)
            await contract.methods
              .deposit(new BigNumber(value).times(new BigNumber(10).pow(18)).toString())
              .send({ from: account })
            setPendingTx(false)
            onDismiss()
          }}
        >
           {TranslateString(1233, "Confirm")}
          
        </ButtonConfirm>
      </FlexBtn>
      <LinkFooter
        href={`${process.env.REACT_APP_EXCHANGE_URL}/pool#/pools`} style={{ margin: 'auto' }}
      >
        {`${TranslateString(1235, "Get")} ${currency}`}
      </LinkFooter>
    </Modal>
  )
}

export default ContributeModal
