import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import React, { useState } from 'react'
import { useSousHarvest } from 'hooks/useHarvest'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import styled from 'styled-components'
import { Button, Flex, IconButton, Modal, useModal } from 'uikit-sotatek'
import Label from 'components/Label'
import Balance from 'components/Balance'
import { getBalanceNumber } from 'utils/formatBalance'
import { baseColors } from 'style/Color'
import OldSyrupTitle from './OldSyrupTitle'
import CompoundModal from './CompoundModal'
import WithdrawModal from './WithdrawModal'
import DepositModal from './DepositModal'

interface StartModalProps {
  onDismiss?: () => void

  accountHasStakedBalance: boolean
  tokenName: string
  sousId: number
  isBnbPool: boolean,
  earnings: BigNumber
  stakingTokenName: string
  stakedBalance: BigNumber
  isOldSyrup: boolean
  needsApproval: boolean
  account: string
  stakingLimit: number
  stakingTokenBalance: BigNumber
  convertedLimit: BigNumber
  isFinished: boolean
  tokenDecimals: number
  harvest: boolean
}

const StartModal: React.FC<StartModalProps> = ({ onDismiss, harvest, tokenDecimals, accountHasStakedBalance, tokenName, sousId, isBnbPool, earnings, stakingTokenName, stakedBalance, isOldSyrup, needsApproval, account, stakingLimit, stakingTokenBalance, convertedLimit, isFinished }) => {
  const TranslateString = useI18n()
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const [pendingTx, setPendingTx] = useState(false)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const [onBack] = useModal(
    <StartModal
      accountHasStakedBalance={accountHasStakedBalance}
      tokenName={tokenName}
      sousId={sousId}
      isBnbPool={isBnbPool}
      earnings={earnings}
      stakingTokenName={stakingTokenName}
      stakedBalance={stakedBalance}
      needsApproval={needsApproval}
      account={account}
      stakingLimit={stakingLimit}
      stakingTokenBalance={stakingTokenBalance}
      convertedLimit={convertedLimit}
      isFinished={isFinished}
      isOldSyrup={isOldSyrup}
      tokenDecimals={tokenDecimals}
      harvest={harvest}
    />
  )
  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} onBack={onBack} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} onBack={onBack} />,
  )
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
      onBack={onBack}
    />,
  )

  return (
    <ModalStyle title={`${TranslateString(999, 'Action')} `} onDismiss={onDismiss}>
      <StyledModal>
        <ActionEarn>
          <StyledImg>
            <img src='/images/balance-icon.svg' alt='balance-icon' />
          </StyledImg>

          {!isOldSyrup ? (
            <BalanceAndCompound>
              <Balance fontSize="32px" value={getBalanceNumber(earnings, tokenDecimals)} />
            </BalanceAndCompound>
          ) : (
              <OldSyrupTitle hasBalance={accountHasStakedBalance} />
            )}
          <Label
            text={TranslateString(330, `${tokenName} EARNED`)}
            colorLabel={baseColors.orange}
          />
          <StyledGroupButton>
            {account && harvest && !isOldSyrup && (
              <HarvestButton
               disabled={!earnings.toNumber() || pendingTx}
                isDisable={earnings.toNumber() || pendingTx}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}
              >
                {pendingTx ? 'Collecting' : 'Harvest'}</HarvestButton>
            )}
            {!isOldSyrup && sousId === 0 && account && harvest && (
              <CompoundButton
                disabled={!earnings.toNumber() || pendingTx}
                isDisable={earnings.toNumber() || pendingTx}
                onClick={onPresentCompound}
              >
                {pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
              </CompoundButton>
            )}

          </StyledGroupButton>
        </ActionEarn>
        <ActionStake>
          <StyledImg>
            <img src='/images/balance-icon.svg' alt='balance-icon' />
          </StyledImg>
          <BalanceAndCompound>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
          </BalanceAndCompound>
          <Label
            text={TranslateString(999, `Your Stake`)}
            colorLabel={baseColors.orange}
          />
          <StyledGroupButton>
            {account && !needsApproval && !isOldSyrup &&
              <ButtonUnstake
                disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                isDisable={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                marginBottom='10px'
                marginTop='10px'
                onClick={
                  isOldSyrup
                    ? async () => {
                      setPendingTx(true)
                      await onUnstake('0')
                      setPendingTx(false)
                    }
                    : onPresentWithdraw
                }
              >
                Unstake
             </ButtonUnstake>
            }

            {account &&
              <StyledAddButton>
                {!isOldSyrup && !needsApproval &&
                  <IconButton disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                    <img src='/images/add-icon.svg' alt='add-icon' />
                  </IconButton>
                }
              </StyledAddButton>
            }

          </StyledGroupButton>
        </ActionStake>
      </StyledModal>
    </ModalStyle >
  )
}
const StyledModal = styled(Flex)`
    ${({ theme }) => theme.mediaQueries.nav} {
      width:662px;
      flex-direction:row;
    }
    flex-direction:column;
`
const ModalStyle = styled(Modal)`
  border: 1px solid #E2E2E8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
`
const Action = styled.div`
    ${({ theme }) => theme.mediaQueries.nav} {
      width: calc(50% - 20px);
    }
    margin-top:10px;
    margin-bottom:10px;
    text-align: center;
    border: 1px solid #E2E2E8;
    border-radius: 20px;
`
const ActionStake = styled(Action)`
  margin-left:none;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left:auto;
  }
`
const ActionEarn = styled(Action)`

`
const BalanceAndCompound = styled.div`
  display: flex;
  margin-top:20px;
  margin-bottom:7px;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >div{
    font-size: 18px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 32px;
    }
  }
`
const ButtonUnstake = styled(Button) <{ isDisable: boolean }>`
  padding: 0 20px;
  background: ${({ isDisable }) => !isDisable && baseColors.primary};
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width:100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: calc(70% - 7px);
  }
`
const StyledAddButton = styled(Flex)`
  
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: calc(30% - 7px);
    margin-bottom:10px;
    margin-top:10px;
    margin-left:auto;
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
const HarvestButton = styled(Button) <{ isDisable: boolean }>`
    background: ${ baseColors.primary};
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
      width: calc(50% - 7px);
    }
`
const CompoundButton = styled(Button) <{ isDisable: boolean }>`
    background: ${ baseColors.primary};
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
    margin-top: 10px;
    margin-left:auto;
    margin-bottom: 10px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
      width: calc(50% - 7px);
    }
`


const StyledGroupButton = styled(Flex)`
  justify-content: center;
  padding:0px 15px 23px 15px;
  margin-top:49px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: row;
  }
`
const StyledImg = styled.div`
>img{
  margin-left: 7px;
}

`
export default StartModal