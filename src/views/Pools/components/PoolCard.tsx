import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image } from '@pancakeswap-libs/uikit'
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
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { ChevronDown, ChevronUp } from 'react-feather'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'

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
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
      <Grid>
        <Grid>
          <GridItem>
            <CardTitle isFinished={isFinished && sousId !== 0}>
              {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
            </CardTitle>
            <FlexFull>
              <Tag />
            </FlexFull>
          </GridItem>
          <GridItem style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={`/images/tokens/${image || tokenName}.png`} width={55} height={55} alt={tokenName} />
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
            <div style={{ textAlign: 'center', marginLeft: '21px' }}>
              <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
              {!isOldSyrup ? (
                <BalanceAndCompound>
                  <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
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
            </div>
          </GridItem>
        </Grid>

        <Grid>
          <GridItem>
            <StyledDetails>
              <StyleFlexDetail style={{ alignItems: 'center' }}>
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
          </GridItem>
          <GridItem style={{ display: 'flex' }}>
            <StyledCardActions>
              <Grid>
                <GridItem>
                  {!account && <UnlockButton />}
                  {account &&
                    (needsApproval && !isOldSyrup ? (
                      <div style={{ flex: 1 }}>
                        <Button disabled={isFinished || requestedApproval} onClick={handleApprove} fullWidth>
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
                        >
                          {`Unstake ${stakingTokenName}`}
                        </Button>
                        <StyledActionSpacer />
                        {!isOldSyrup && (
                          <IconButton disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                            <AddIcon color="background" />
                          </IconButton>
                        )}
                      </>
                    ))}
                </GridItem>

                <GridItem>
                  <Button onClick={handleClick} fullWidth>
                    {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
                  </Button>
                </GridItem>
              </Grid>
            </StyledCardActions>
          </GridItem>
        </Grid>
      </Grid>
      {isOpenDetail && (
        <CardFooter
          projectLink={projectLink}
          totalStaked={totalStaked}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          poolCategory={poolCategory}
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

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 16px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const GridItem = styled.div`
  padding: 24px;
  align-self: center;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const StyleFlexDetail = styled.div`
  flex: 1;
`
export default PoolCard
