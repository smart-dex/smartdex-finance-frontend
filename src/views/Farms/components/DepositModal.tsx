import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal } from 'uikit-sotatek'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import styled from 'styled-components'
import { baseColors, darkColors, lightColors } from 'style/Color'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
  onBack?: () => void
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  onBack,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.value) {
        const data = e.currentTarget.value.replaceAll(',', '')
        setVal(data)
      } else {
        setVal('')
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <ModalStyle title={TranslateString(1068, 'Stake LP tokens')} onDismiss={onBack}>
      <StyledModal>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <ModalInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName}
          addLiquidityUrl={addLiquidityUrl}
        />
        <ModalActions>
          <ButtonCancel variant="secondary" onClick={onBack}>
            {TranslateString(462, 'Cancel')}
          </ButtonCancel>
          <ButtonConfirm
            disabled={pendingTx || Number(fullBalance) === 0 || Number(val) > Number(fullBalance) || Number(val) === 0}
            onClick={async () => {
              try {
                setPendingTx(true)
                await onConfirm(val)
                onDismiss()
              } catch (e) {
                console.error(e)
              } finally {
                setPendingTx(false)
              }
            }}
          >
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
          </ButtonConfirm>
        </ModalActions>
        <Stylelink>
          <StyledLinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
            {TranslateString(999, 'Get')} {tokenName}
          </StyledLinkExternal>
        </Stylelink>
      </StyledModal>
    </ModalStyle>
  )
}
const Stylelink = styled.div`
  text-align: -webkit-center;
`

const ButtonConfirm = styled(Button)`
  background: ${baseColors.primary};
  box-shadow: 0px 4px 10px
    ${({ theme }) => (theme.isDark ? '  0px 4px 10px rgba(0, 133, 255, 0.24)' : 'rgba(83, 185, 234, 0.24)')};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px;
`
const ButtonCancel = styled(Button)`
  color: ${baseColors.primary};
  border-color: ${baseColors.primary};
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`
const StyledModal = styled.div`
${({ theme }) => theme.mediaQueries.nav} {
  width 551px;
}
`
const ModalStyle = styled(Modal)`
  border: 1px solid #e2e2e8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
`
const StyledLinkExternal = styled(LinkExternal)`
  font-size: 13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  width: fit-content;
  background: none;
  svg {
    padding-left: 4px;
    width: auto;
    fill: ${baseColors.primary};
  }
`
export default DepositModal
