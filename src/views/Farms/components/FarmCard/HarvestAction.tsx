import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}
const StyledHarvestAction = styled(Flex)`
  flex-grow:2;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <StyledHarvestAction mb="8px" justifyContent="space-between" flexDirection='column'>
      <Flex>
        <Text bold textTransform="uppercase" fontSize="16px" style={{ flex: 1 }}>
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          CAKE {TranslateString(1072, 'Earned')}
        </Text>
        <Text color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'} fontSize='16px'>{displayBalance}</Text>
      </Flex>

      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {TranslateString(562, 'Harvest')}
      </Button>
    </StyledHarvestAction>
  )
}

export default HarvestAction
