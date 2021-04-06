import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled, { css } from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Button, Flex, useModal } from 'uikit-sotatek'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors, baseColors } from 'style/Color'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import SelectModal from '../SelectModal'


const ButtonAction = styled(Flex)`
  margin-bottom:10px;
  padding: 0px 20px 0px 20px;
  width:100%;
  flex-direction: column;
  margin-bottom:20px;
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


const ButtonDetail = styled(Button) <{ isShow: boolean }>`
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

const ButtonApprove = styled(Button) <{ isDisable: boolean }>`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  background: ${({ isDisable }) => isDisable && ''};
  color: #17C267;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  width: 100%;
  border: 1px solid #17C267;
  border-radius: 10px;
  box-shadow: none;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledButtonUnlock = styled(UnlockButton)`
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  width: 100%;
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



const ButtonDeposit = styled(Button)`
  text-align: center;
  width:100%;
  background: #0085FF;
  box-shadow: none;
  border-radius: 10px;
  border:none;
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  background: #0085FF;
  margin-top:10px;
  margin-bottom:10px;
  height:56px;
  display: flex;
    justify-content: center;
    align-self: center;
  >span{
    margin:auto;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
  }
`

const SelectButton = styled(Button)`
  background: #0085FF;
  box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
  border-radius: 10px;
  width: calc(50% - 9px);
  font-size: 13px;
  margin-bottom:10px;
  margin-top:10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
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
  earnLabel: string
  removed: boolean,
  pendingTx: boolean,
  setPendingTx: (pendingTx: boolean) => void
}

const CardActions: React.FC<FarmCardActionsProps> = ({
  farm,
  ethereum,
  account,
  addLiquidityUrl,
  changeOpenDetail,
  isOpenDetail,
  earnLabel,
  removed,
  pendingTx,
  setPendingTx
}) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const Icon = isOpenDetail ? ChevronUp : ChevronDown
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])
  const [onSelect] = useModal(
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
    return !isApproved && (
      <ButtonApprove disabled={requestedApproval || removed} isDisable={requestedApproval || removed} onClick={handleApprove} mt="10px" mb="10px">
        {TranslateString(758, 'Approve Contract')}
      </ButtonApprove>
    )
  }

  return (
    <ButtonAction>
      <StyledGroupButton>
        {!account ? (
          <StyledButtonUnlock > <UnlockButton /></StyledButtonUnlock>
        ) : (
            <>
              {renderApprovalOrStakeButton()}
              {
                isApproved && (
                  <>
                    {
                      tokenBalance.eq(0) && rawStakedBalance === 0 ?
                        (
                          <ButtonDeposit as="a" href={addLiquidityUrl} target="_blank" >
                            <span>  {TranslateString(999, 'Deposit')}</span>

                          </ButtonDeposit>
                        ) : (
                          <>
                            <SelectButton onClick={onSelect}>   {TranslateString(999, 'Select')}</SelectButton>
                            <ButtonDetail onClick={changeOpenDetail} isShow={isOpenDetail} mt="10px" mb="10px">
                              {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
                            </ButtonDetail>
                          </>
                        )
                    }
                  </>
                )
              }
            </>
          )}
      </StyledGroupButton>
    </ButtonAction>
  )
}

export default CardActions
