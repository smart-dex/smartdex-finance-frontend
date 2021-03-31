import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import {  baseColors } from 'style/Color'
import Balance from 'components/Balance'
import Label from 'components/Label/Label'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  earnLabel:string
  onBack:()=>void
}
const StyledHarvestAction = styled(Flex)`
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
  padding-bottom: 25px;
  @media (max-width: 967px) {
    margin-top: 16px;
    flex-wrap: wrap;
    margin-left: 0px;
    margin-right: 0px;
  }
`

const StyledButton = styled(Button) <{ isDisable: boolean }>`
  margin-top: 60px;
  margin-left:auto;
  margin-right:auto;
  background: ${({ isDisable }) => !isDisable && baseColors.primary};
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  font-weight: 600;
  max-width: 143px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: 143px;
  }
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

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid,earnLabel, onBack }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  return (
    <StyledHarvestAction>
      <BalanceAndCompound>
        <Balance fontSize="32px" value={rawEarningsBalance} />
      </BalanceAndCompound>
      <Label
        text={`${earnLabel} ${TranslateString(1072, 'Earned')}`}
        colorLabel={baseColors.orange}
      />
      <StyledButton
        disabled={rawEarningsBalance === 0 || pendingTx}
        isDisable={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
          onBack()
        }}
      >
        {TranslateString(562, 'Harvest')}
      </StyledButton>
    </StyledHarvestAction>
  )
}

export default HarvestAction
