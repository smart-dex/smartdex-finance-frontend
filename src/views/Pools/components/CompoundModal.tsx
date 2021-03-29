import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useMemo, useState } from 'react'
import { Button, Modal } from 'uikit-sotatek'
import ModalActions from 'components/ModalActions'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

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
      <BalanceRow>
        <Balance value={Number(fullBalance)} />
      </BalanceRow>
      <ModalActions>
        <Button variant="secondary" onClick={onBack}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
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
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default CompoundModal

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
