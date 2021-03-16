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
import { lightColors, darkColors, baseColors } from 'style/Color'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const Action = styled.div`
  display: flex;
  flex-grow: 2;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: normal;
  margin-left: 0px;
   ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: 16px;
    flex-direction: row;
    flex-wrap: nowrap;
  }
 
`
const ButtonAction = styled(Flex)`
  flex-grow: 2;
  flex-direction: column;
  margin-top: 16px;
  margin-left: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: 25px;
    margin-top: 0px;
  }
`
const StyledGroupButton = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.nav} {
    justify-content: space-between;
  }
`

const FarmStakedText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 18px;
`
const ButtonDetail = styled(Button)`
  border: 1px solid ${baseColors.primary};
  border-radius: 10px;
  color: #0085ff;
  background-color: ${({ theme }) => (theme.isDark ? darkColors.background : lightColors.background)};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  $margin: 0.25rem;
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
    return !isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Button disabled={requestedApproval} onClick={handleApprove} style={{ maxWidth: '143px' }} mt="10px" mb="10px">
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
          {!account ? <UnlockButton style={{ maxWidth: '143px' }}  mt="10px" mb="10px"/> : renderApprovalOrStakeButton()}
          <ButtonDetail onClick={changeOpenDetail} style={{ minWidth: '143px' }} mt="10px" mb="10px">
            {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
          </ButtonDetail>
        </StyledGroupButton>
      </ButtonAction>
    </Action>
  )
}

export default CardActions
