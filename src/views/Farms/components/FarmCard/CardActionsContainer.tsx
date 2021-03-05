import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { getAddress } from 'utils/addressHelpers'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'


const Action = styled.div`
  padding-top: 16px;
  display: flex;
  flex-grow:2;
  justify-content: space-around;
`
const ButtonAction = styled(Flex)`
  flex-grow:1;
`

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  addLiquidityUrl?: string
  changeOpenDetail: () => void
  isOpenDetail: boolean
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account, addLiquidityUrl, changeOpenDetail, isOpenDetail }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const Icon = isOpenDetail ? ChevronUp : ChevronDown

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
        <Button mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
          {TranslateString(758, 'Approve Contract')}
        </Button>
      )
  }

  return (
    <Action>
      <HarvestAction earnings={earnings} pid={pid} />
      <ButtonAction flexDirection='column'>
        <Text bold textTransform="uppercase" fontSize="16px">
          {lpName}   {TranslateString(1074, 'Staked')}
        </Text>
        <Flex flexWrap='wrap'>
          {!account ? <UnlockButton mt="8px"/> : renderApprovalOrStakeButton()}
          <Button variant='secondary' onClick={changeOpenDetail} margin='10px'>
            {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
          </Button>
        </Flex>

      </ButtonAction>
    </Action>
  )
}

export default CardActions
