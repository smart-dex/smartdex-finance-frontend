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
import { usePoolFromPid } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { baseColors } from 'style/Color'
import OldSyrupTitle from './OldSyrupTitle'
import CompoundModal from './CompoundModal'
import WithdrawModal from './WithdrawModal'
import DepositModal from './DepositModal'


interface SelectModalProps {
  onDismiss?: () => void
  tokenName: string
  sousId: number
  isBnbPool: boolean,
  stakingTokenName: string
  isOldSyrup: boolean
  needsApproval: boolean
  account: string
  stakingLimit: number
  convertedLimit: BigNumber
  isFinished: boolean
  tokenDecimals: number
  harvest: boolean
}

const SelectModal: React.FC<SelectModalProps> = ({ onDismiss, harvest, tokenDecimals, tokenName, sousId, isBnbPool, stakingTokenName, isOldSyrup, needsApproval, account, stakingLimit, convertedLimit, isFinished }) => {
  const TranslateString = useI18n()
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const { userData }= usePoolFromPid(sousId)
  
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const [pendingTx, setPendingTx] = useState(false)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const [onBack] = useModal(
    <SelectModal
      tokenName={tokenName}
      sousId={sousId}
      isBnbPool={isBnbPool}
      stakingTokenName={stakingTokenName}
      needsApproval={needsApproval}
      account={account}
      stakingLimit={stakingLimit}
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
    <ModalStyle title={` `} onDismiss={onDismiss}>
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
                  try {
                    setPendingTx(true)
                  await onReward()
                  onDismiss()
                  } catch (error) {
                    console.error(error)
                  } finally{
                    setPendingTx(false)
                  }
                }}
              >
                {pendingTx ? 'Collecting' : `${ TranslateString(999, 'Claim')}`}</HarvestButton>
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
                      try {
                        setPendingTx(true)
                        await onUnstake('0')
                      } catch (error) {
                        console.error(error)
                      } finally {
                        setPendingTx(false)
                      }   
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
      width: 662px;
      flex-direction:row;
    }
    flex-direction:column;
    max-height: 330px;
    overflow-y: auto;
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
const HarvestButton = styled(Button) <{ isDisable: boolean }>`
    background: ${baseColors.primary};
    box-shadow: none;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
    max-width:143px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right:0px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
      min-width:143px;
      margin-right:7px;
    }
`
const CompoundButton = styled(Button) <{ isDisable: boolean }>`
  background: ${baseColors.primary};
  box-shadow: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width: 100%;
  max-width:143px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left:0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    min-width:143px;
    margin-left:7px;
  }
`


const StyledGroupButton = styled(Flex)`
  justify-content: center;
  align-items: center;
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
export default SelectModal