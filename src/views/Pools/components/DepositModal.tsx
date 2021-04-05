import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from 'uikit-sotatek'
import ModalActions from 'components/ModalActions'
import { baseColors, darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'


interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  onBack?: ()=>void
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '',onBack }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <ModalStyle title={`${TranslateString(316, 'Deposit')} ${tokenName} Tokens`} onDismiss={onBack}>
      <StyledModal> 
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName}
        />
        <ModalActions>
          <ButtonCancel variant="secondary" onClick={onBack}>
            {TranslateString(462, 'Cancel')}
          </ButtonCancel>
          <ButtonConfirm
            disabled={pendingTx || Number(fullBalance) === 0 || Number(val) < 0 || Number(val) > Number(fullBalance) || Number.isNaN(Number(val))}
            onClick={async () => {
              setPendingTx(true)
              await onConfirm(val)
              setPendingTx(false)
              onDismiss()
            }}
          >
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
          </ButtonConfirm>
        </ModalActions>
      </StyledModal>

    </ModalStyle>
  )
}

const ButtonConfirm = styled(Button)`
  background: ${ baseColors.primary};
  box-shadow: 0px 4px 10px  ${({ theme }) => (theme.isDark ? '  0px 4px 10px rgba(0, 133, 255, 0.24)' : 'rgba(83, 185, 234, 0.24)')};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px;

`
const ButtonCancel = styled(Button)`
  background:  ${({ theme }) => (theme.isDark ? '#2A3145' : '#D9D9DE')};
  box-shadow: 0px 4px 10px  ${({ theme }) => (theme.isDark ? ' rgba(42, 49, 69, 0.24)' : 'rgba(217, 217, 222, 0.24)')};
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorButtonCancel : lightColors.colorButtonCancel)};;
  border:none;
`
const StyledModal = styled.div`
${({ theme }) => theme.mediaQueries.nav} {
  width 551px;
}
`
const ModalStyle = styled(Modal)`
  border: 1px solid #E2E2E8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
`
export default DepositModal
