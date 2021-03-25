import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled, { css } from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Button, Flex, Heading, Text } from 'uikit-sotatek'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors, baseColors } from 'style/Color'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'



const ButtonAction = styled(Flex)`
  padding: 0px 20px 0px 20px;
  width:100%;
  flex-direction: column;
  margin-bottom:10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    
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
  font-size: 14px;
  line-height: 17px;
`
const ButtonDetail = styled(Button)<{isShow:boolean}>`
${(props) =>
  props.isShow ?
    (
      css`
    border: 1px solid  ${({ theme }) => (theme.isDark ? darkColors.borderButtonDetail : lightColors.borderButtonDetail)};
    color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#5F5E76')};
    `
    ) :
    (
      css`
      border: 1px solid  ${baseColors.primary};
      color: ${baseColors.primary};
      `
    )
}
margin-left: auto;
width: calc(50% - 9px);
box-shadow:none;
border-radius: 10px;
background-color: ${({ theme }) => (theme.isDark ? darkColors.background : lightColors.background)};
font-weight: 600;
font-size: 13px;
line-height: 20px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}
`

const ButtonApprove = styled(Button)<{ isDisable: boolean }>`
  background: ${({ isDisable }) => !isDisable && baseColors.primary};
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width: calc(50% - 9px);
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledButtonUnlock  = styled(UnlockButton)`
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  width: calc(50% - 9px);
  font-weight: 600;
  font-size: 13px;
  height:56px;
  line-height: 20px;
  margin-top:10px;
  margin-bottom:10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
  color: #FFFFFF;
  background: ${baseColors.primary};
`
const StyledDivText = styled(Flex)`
align-items: center;

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
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const Icon = isOpenDetail ? ChevronUp : ChevronDown
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()
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
      <ButtonApprove disabled={requestedApproval} isDisable={requestedApproval} onClick={handleApprove} style={{  width: 'calc(50% - 9px)' }} mt="10px" mb="10px">
        {TranslateString(758, 'Approve Contract')}
      </ButtonApprove>
    )
  }

  return (
      <ButtonAction>
        <StyledDivText>
          <FarmStakedText bold textTransform="uppercase" fontSize="16px" style={{flex:'1'}}>
            {lpName} {TranslateString(1074, 'Staked')}
          </FarmStakedText>
          <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
        </StyledDivText>
    
        <StyledGroupButton>
          {!account ? (
              <StyledButtonUnlock />
           
          ) : (
            renderApprovalOrStakeButton()
          )}
          <ButtonDetail onClick={changeOpenDetail} isShow={isOpenDetail}  mt="10px" mb="10px">
            {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
          </ButtonDetail>
        </StyledGroupButton>
      </ButtonAction>
  )
}

export default CardActions
