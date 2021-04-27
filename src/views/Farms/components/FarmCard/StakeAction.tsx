import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, IconButton, useModal } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { baseColors, darkColors, lightColors } from 'style/Color'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  onBack: () => void
  removed: boolean
  pendingTxModal: boolean
}

const StyledAddButton = styled(Flex)`
  margin-left: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 14px;
  }
  justify-content: center;
  > button {
    box-shadow: none;
    width: 56px;
    height: 56px;
    background: #0085ff;
    border: 1px solid #0085ff;
  }
  svg path {
    fill: white;
  }
  .icon-disabled {
    svg path {
      fill: ${({ theme }) => (theme.isDark ? darkColors.textDisabled : lightColors.textDisabled)};
    }
  }
`
const StakeButton = styled(Button)`
  color: ${baseColors.primary};
  border-color: ${baseColors.primary};
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width: 143px;
  margin-top: 10px;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledAction = styled(Flex)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  margin-top: 50px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: row;
  }
`
const ButtonUnstake = styled(Button)`
  padding: 0 20px;
  background: ${({ isDisable }) => !isDisable && baseColors.primary};
  box-shadow: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 143px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: 143px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
  onBack,
  removed,
  pendingTxModal,
}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
      addLiquidityUrl={addLiquidityUrl}
      onBack={onBack}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} onBack={onBack} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <StakeButton onClick={onPresentDeposit} disabled={removed || pendingTxModal}>
        {TranslateString(999, 'Stake LP')}
      </StakeButton>
    ) : (
      <>
        <ButtonUnstake onClick={onPresentWithdraw} disabled={pendingTxModal}>
          {TranslateString(999, 'Unstake')}
        </ButtonUnstake>
        <StyledAddButton>
          <IconButton
            disabled={removed || pendingTxModal}
            className={removed || pendingTxModal ? 'icon-disabled' : ''}
            variant="tertiary"
            onClick={onPresentDeposit}
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5625 17.3125C8.5625 17.5611 8.66127 17.7996 8.83709 17.9754C9.0129 18.1512 9.25136 18.25 9.5 18.25C9.74864 18.25 9.9871 18.1512 10.1629 17.9754C10.3387 17.7996 10.4375 17.5611 10.4375 17.3125V10.4375H17.3125C17.5611 10.4375 17.7996 10.3387 17.9754 10.1629C18.1512 9.9871 18.25 9.74864 18.25 9.5C18.25 9.25136 18.1512 9.0129 17.9754 8.83709C17.7996 8.66127 17.5611 8.5625 17.3125 8.5625H10.4375V1.6875C10.4375 1.43886 10.3387 1.2004 10.1629 1.02459C9.9871 0.848772 9.74864 0.75 9.5 0.75C9.25136 0.75 9.0129 0.848772 8.83709 1.02459C8.66127 1.2004 8.5625 1.43886 8.5625 1.6875V8.5625H1.6875C1.43886 8.5625 1.2004 8.66127 1.02459 8.83709C0.848772 9.0129 0.75 9.25136 0.75 9.5C0.75 9.74864 0.848772 9.9871 1.02459 10.1629C1.2004 10.3387 1.43886 10.4375 1.6875 10.4375H8.5625V17.3125Z" />
            </svg>
          </IconButton>
        </StyledAddButton>
      </>
    )
  }

  return (
    <StyledAction justifyContent="center" alignItems="center">
      {renderStakingButtons()}
    </StyledAction>
  )
}

export default StakeAction
