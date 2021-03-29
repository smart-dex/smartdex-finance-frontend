import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useMemo, useState } from 'react'
import { Button, Modal } from 'uikit-sotatek'
import ModalActions from 'components/ModalActions'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { baseColors,lightColors,darkColors } from 'style/Color'

interface DepositModalProps {
  earnings: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  onBack?: () =>void
}

const CompoundModal: React.FC<DepositModalProps> = ({ earnings, onConfirm, tokenName = '' ,onBack,onDismiss}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(earnings)
  }, [earnings])

  return (
    <Modal
      title={`${TranslateString(704, 'Compound')} ${TranslateString(330, `${tokenName} Earned`)}`}
      onDismiss={onBack}
    >
      <StyledModal>
      <BalanceRow>
        <Balance value={Number(fullBalance)} />
      </BalanceRow>
      <ModalActions>
        <ButtonCancel variant="secondary" onClick={onBack}>
          {TranslateString(462, 'Cancel')}
        </ButtonCancel>
        <ButtonConfirm
          id="compound-cake"
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(fullBalance)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </ButtonConfirm>
      </ModalActions>
      </StyledModal>
      
    </Modal>
  )
}

export default CompoundModal

const BalanceRow = styled.div`
  margin-top:90px;
  margin-bottom:60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
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
