import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, IconButton, useModal } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { baseColors } from 'style/Color'
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
  margin-left:0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    margin-bottom:10px;
    margin-top:10px;
    margin-left:14px;
  }
  justify-content:center;
  > button{
    box-shadow:none;
    width:56px;
    height:56px;
    background: #0085FF;
    border: 1px solid #0085FF;
  }
`
const StakeButton = styled(Button)`
  background: ${baseColors.primary};
  box-shadow: none;
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
  padding-left:20px;
  padding-right:20px;
  padding-bottom: 20px;
  margin-top: 50px;
  flex-direction:column;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction:row;
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
  max-width: 143px;
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
  pendingTxModal
}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} onBack={onBack} />,
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
            <IconButton disabled={removed} variant="tertiary" onClick={onPresentDeposit}>
              <img src='/images/add-icon.svg' alt='add-icon' />
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
