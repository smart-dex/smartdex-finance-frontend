import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import React from 'react'
import styled from 'styled-components'
import { baseColors } from 'style/Color'
import { getBalanceNumber } from 'utils/formatBalance'
import { Flex, Modal, useModal } from 'uikit-sotatek'
import Label from 'components/Label'
import Balance from 'components/Balance'
import HarvestAction from './FarmCard/HarvestAction'
import StakeAction from './FarmCard/StakeAction'


interface SelectModalProps {
  onDismiss?: () => void
  earnings: BigNumber
  pid: number
  stakedBalance: BigNumber
  lpName: string
  addLiquidityUrl: string
  tokenBalance: BigNumber
  earnLabel: string
  removed: boolean
  pendingTx: boolean
  setPendingTx: (pendingTx: boolean) => void
}

const SelectModal: React.FC<SelectModalProps> = ({ onDismiss, removed, earnings, pid, stakedBalance, lpName, earnLabel, tokenBalance, pendingTx, setPendingTx, addLiquidityUrl }) => {
  const TranslateString = useI18n()
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const [onBack] = useModal(
    <SelectModal
      pid={pid}
      earnings={earnings}
      stakedBalance={stakedBalance}
      lpName={lpName}
      tokenBalance={tokenBalance}
      addLiquidityUrl={addLiquidityUrl}
      earnLabel={earnLabel}
      removed={removed}
      pendingTx={pendingTx}
      setPendingTx={setPendingTx}
    />
  )
  return (
    <ModalStyle title={` `} onDismiss={onDismiss}>
      <WrapStyle>
        <StyledModal>
          <ActionEarn>
            <StyledImg>
              <img src='/images/balance-icon.svg' alt='balance-icon' />
              <HarvestAction earnings={earnings} pid={pid} earnLabel={earnLabel} onBack={onDismiss} pendingTx={pendingTx} setPendingTx={setPendingTx} />
            </StyledImg>

          </ActionEarn>
          <ActionStake>
            <StyledImg>
              <img src='/images/balance-icon.svg' alt='balance-icon' />
            </StyledImg>
            <BalanceAndCompound>
              <Balance fontSize="32px" value={rawStakedBalance} />
            </BalanceAndCompound>
            <Label
              text={`${lpName} ${TranslateString(1074, 'Staked')}`}
              colorLabel={baseColors.orange}
            />
            <StakeAction
              onBack={onBack}
              stakedBalance={stakedBalance}
              tokenBalance={tokenBalance}
              tokenName={lpName}
              pid={pid}
              addLiquidityUrl={addLiquidityUrl}
              removed={removed}
            />
          </ActionStake>
        </StyledModal>
      </WrapStyle>
    </ModalStyle>
  )
}
const WrapStyle = styled.div`
  max-height: 320px;
  overflow-y: auto;
`
const StyledModal = styled(Flex)`
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 662px;
      flex-direction:row;
    }
    flex-direction: column;

`
const ModalStyle = styled(Modal)`
  border: 1px solid #E2E2E8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  overflow-y: auto;
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
    margin-left: auto;
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
  > div{
    font-size: 18px;
    ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 32px;
    }
  }
`
const StyledImg = styled.div`
  >img{
    margin-left: 8px;
  }

`


export default SelectModal