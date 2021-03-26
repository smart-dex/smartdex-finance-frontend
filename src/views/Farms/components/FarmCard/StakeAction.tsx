import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, IconButton, MinusIcon, useModal } from 'uikit-sotatek'
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
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`
const StyledAddButton = styled(Flex)`
  justify-content: flex-end;
  > button{
    box-shadow:none;
    width:56px;
    height:56px;
    background: #17C267;
    border: 1px solid #17C267;
  }
`
const StakeButton = styled(Button)`
  background: ${ baseColors.primary};
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledAction= styled(Flex)`
width: calc(50% - 9px);
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <StakeButton onClick={onPresentDeposit}>
        {TranslateString(999, 'Stake LP')}
      </StakeButton>
    ) : (
        <IconButtonWrapper>
          <StyledAddButton>
            <IconButton variant="tertiary" onClick={onPresentDeposit}  mr="6px">
              <img src='/images/add-icon.svg' alt='add-icon' />
            </IconButton>
          </StyledAddButton>
          <IconButton variant="tertiary" onClick={onPresentWithdraw}>
            <MinusIcon color="primary" />
          </IconButton>
        </IconButtonWrapper>
      )
  }

  return (
    <StyledAction justifyContent="space-between" alignItems="center">
      {renderStakingButtons()}
    </StyledAction>
  )
}

export default StakeAction
