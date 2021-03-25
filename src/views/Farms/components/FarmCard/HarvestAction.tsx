import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { lightColors, darkColors, baseColors } from 'style/Color'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}
const StyledHarvestAction = styled(Flex)`
  width: 50%;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 17px;
  @media (max-width: 967px) {
    margin-top: 16px;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 0px;
    margin-right: 0px;
  }
`
const CakeEarn = styled(Flex)`
  margin-bottom: 11px;
  @media (max-width: 968px) {
    flex-direction: column;
  }
`
const CakeEarnText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  @media (max-width: 968px) {
    margin-bottom: 10px;
  }
`
const BalanceCake = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`
const StyledButton = styled(Button)<{isDisable:boolean}>`
  background: ${({ isDisable }) => !isDisable && baseColors.primary};
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()
  return (
    <StyledHarvestAction>
      <CakeEarn>
        <CakeEarnText bold textTransform="uppercase" fontSize="16px" style={{ flex: 1 }}>
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          CAKE {TranslateString(1072, 'Earned')}
        </CakeEarnText>
        <BalanceCake>{displayBalance}</BalanceCake>
      </CakeEarn>

      <StyledButton
        disabled={rawEarningsBalance === 0 || pendingTx}
        isDisable={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
        style={{ maxWidth: '143px' }}
      >
        {TranslateString(562, 'Harvest')}
      </StyledButton>
    </StyledHarvestAction>
  )
}

export default HarvestAction
