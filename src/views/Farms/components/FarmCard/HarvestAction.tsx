import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
// import { lightColors, darkColors } from 'style/Color'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}
const StyledHarvestAction = styled(Flex)`
  flex-grow:2;
  flex-direction: column;
  margin-left:16px;
  margin-right:16px;
  @media (max-width: 968px) {
    margin-top:16px;
    flex-direction:row;
    justify-content: space-between;
    flex-wrap:wrap;
    margin-left:0px;
    margin-right:0px;
  }
`
const CakeEarn = styled(Flex)`
  margin-bottom: 10px;
  @media (max-width: 968px) {
    flex-direction:column;
  }
`
const CakeEarnText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(95, 94, 118, 0.7)')};
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <StyledHarvestAction >
      <CakeEarn>
        <CakeEarnText bold textTransform="uppercase" fontSize="16px" style={{ flex: 1 }}>
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          CAKE {TranslateString(1072, 'Earned')}:
        </CakeEarnText>
        <Text color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'} fontSize='16px'>{displayBalance}</Text>
      </CakeEarn>

      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
        style={{maxWidth:'143px'}}
      >
        {TranslateString(562, 'Harvest')}
      </Button>
    </StyledHarvestAction>
  )
}

export default HarvestAction
