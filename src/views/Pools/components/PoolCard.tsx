import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { ChevronDown, ChevronUp } from 'react-feather'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { lightColors, darkColors } from 'style/Color'
import Balance from 'components/Balance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'
import CardContent from './CardContent'

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance

  const tags = {
    [PoolCategory.BINANCE]: BinanceTag,
    [PoolCategory.CORE]: CoreTag,
    [PoolCategory.COMMUNITY]: CommunityTag,
  }
  const Tag = tags[poolCategory]

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const Icon = isOpenDetail ? ChevronUp : ChevronDown
  const handleClick = () => setIsOpenDetail(!isOpenDetail)

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <CardContent>
        {isFinished && sousId !== 0 && <PoolFinishedSash />}
        <NamePool>
          <CardTitle isFinished={isFinished && sousId !== 0}>
            {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
          </CardTitle>
          <FlexFull>
            <Tag />
          </FlexFull>
        </NamePool>

        <StyledImagePool>
          <ImageCoin>
            <img src={`/images/tokens/${image || tokenName}.png`} alt={tokenName} style={{ width: "100%", height: "100%" }} />
          </ImageCoin>
          {account && harvest && !isOldSyrup && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          )}
        </StyledImagePool>


        <StyledCoinEarned>
          <Label isFinished={isFinished && sousId !== 0}   text={TranslateString(330, `${tokenName} earned`)} colorLabel='#FFA14E'/>
          {!isOldSyrup ? (
            <BalanceAndCompound>
              <Balance value={getBalanceNumber(earnings, tokenDecimals)} color='' isDisabled={isFinished} />
              {sousId === 0 && account && harvest && (
                <HarvestButton
                  disabled={!earnings.toNumber() || pendingTx}
                  text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
                  onClick={onPresentCompound}
                />
              )}
            </BalanceAndCompound>
          ) : (
              <OldSyrupTitle hasBalance={accountHasStakedBalance} />
            )}
        </StyledCoinEarned>

        <DetailPool>
          <StyledDetails>
            <StyleFlexDetail>
              <span role="img" aria-label={stakingTokenName}>
                🥞{' '}
              </span>
              {TranslateString(736, 'APR')}:
              </StyleFlexDetail>
            {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
              '-'
            ) : (
                <Balance fontSize="16px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
              )}
          </StyledDetails>
          <StyledDetails>
            <StyleFlexDetail>{TranslateString(384, 'Your Stake')}:</StyleFlexDetail>
            <Balance fontSize="16px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
          </StyledDetails>
        </DetailPool>

        <StyledCardActions>
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} margin='10px' onClick={handleApprove} style={{ maxWidth: '143px', minWidth: '120px' }}>
                  {`Approve ${stakingTokenName}`}
                </Button>
              </div>
            ) : (
                <>
                  <Button
                    disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                    onClick={
                      isOldSyrup
                        ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                        : onPresentWithdraw
                    }
                    margin='10px'
                    style={{ maxWidth: '143px', minWidth: '120px' }}
                  >
                    {`Unstake ${stakingTokenName}`}
                  </Button>

                  {!isOldSyrup && (
                    <IconButton disabled={isFinished && sousId !== 0} margin='10px' onClick={onPresentDeposit}>
                      <AddIcon color="background" />
                    </IconButton>
                  )}

                </>
              ))}

          <Button variant='secondary' onClick={handleClick} margin='10px' style={{ minWidth: '143px' }}>
            {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
          </Button>

        </StyledCardActions>
      </CardContent>

      {isOpenDetail && (
        <CardFooter
          projectLink={projectLink}
          totalStaked={totalStaked}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          isOpenDetail={isOpenDetail}
        />
      )}
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

// const StyledActionSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `

const StyledDetails = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
`

const NamePool = styled.div`
  order: 1;
  padding: 24px;
  align-self: center;
  align-items: center;
  flex-grow: 2;
  width:150px;
`
const ImageCoin = styled.div`
  width:55px;
  height:55px;
  margin: 0 auto;
`
const StyledImagePool = styled.div`
  flex-grow: 1;
  order:2;
  align-self: center;
  align-items: center;
  padding:20px;
`

const StyledCoinEarned = styled.div`
  order: 3;
  align-self: center;
  align-items: center;
  min-width: 200px;
  padding: 24px;
  text-align: center;
  flex-grow: 1;
`
const DetailPool = styled.div`
  order: 4;
  align-self: center;
  align-items: center;
  padding: 24px;
  flex-grow: 1;
  min-width: 210px;
`

const StyledCardActions = styled.div`
  display: flex;
  box-sizing: border-box;
  order: 5;
  align-self: center;
  align-items: center;
  padding: 24px;
  flex-grow: 1;
  justify-content: space-between;
  // @media (max-width: 968px) {
  //   justify-content: space-around;
  // }

  flex-wrap: wrap;
`

const FlexFull = styled.div`
  flex: 1;
`
const StyleFlexDetail = styled.div`
  flex: 1;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
`


export default PoolCard
