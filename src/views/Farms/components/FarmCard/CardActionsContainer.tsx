import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { getAddress } from 'utils/addressHelpers'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Button, Flex, Text } from 'uikit-sotatek'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors } from 'style/Color'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const Action = styled.div`
  display: flex;
  flex-grow: 2;
  justify-content: space-around;
  margin-left: 16px;
  @media (max-width: 968px) {
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 0px;
  }
`
const ButtonAction = styled(Flex)`
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 968px) {
    margin-top: 16px;
  }
`
const StyledGroupButton = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 968px) {
    justify-content: space-around;
  }
`

const FarmStakedText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.text)};
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

const CardActions: React.FC<FarmCardActionsProps> = ({
  farm,
  ethereum,
  account,
  addLiquidityUrl,
  changeOpenDetail,
  isOpenDetail,
}) => {
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
      <Button mt="10px" disabled={requestedApproval} onClick={handleApprove} style={{ maxWidth: '156px' }}>
        {TranslateString(758, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
      <HarvestAction earnings={earnings} pid={pid} />
      <ButtonAction>
        <FarmStakedText bold textTransform="uppercase" fontSize="16px">
          {lpName} {TranslateString(1074, 'Staked')}
        </FarmStakedText>
        <StyledGroupButton>
          {!account ? <UnlockButton mt="10px" style={{ maxWidth: '156px' }} /> : renderApprovalOrStakeButton()}
          <Button variant="secondary" onClick={changeOpenDetail} mt="10px" style={{ minWidth: '156px' }}>
            {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
          </Button>
        </StyledGroupButton>
      </ButtonAction>
    </Action>
  )
}

export default CardActions
