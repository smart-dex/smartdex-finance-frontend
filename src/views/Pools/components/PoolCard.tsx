import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Flex } from 'uikit-sotatek'
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
import { lightColors, darkColors, baseColors } from 'style/Color'
import Balance from 'components/Balance'
// import StyledTriangle from './StyledTriangle'
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
      <StyledCardName>
        <NamePool>
          <CardTitle isFinished={isFinished && sousId !== 0}>
            {isFinished && sousId !== 0 ? (
              <>
                <StyleNameFinished>  {TranslateString(999, 'Finished')}</StyleNameFinished>
                <StyledTriangle isFinished={isFinished} />
              </>
            ) : (
                <>
                  <StyleNamePool> {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
                    <StyledTooltip>  {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
                    </StyledTooltip>
                  </StyleNamePool>
                  <StyledTriangle isFinished={isFinished} />
                </>
              )
            }
          </CardTitle>
          <StyledTag>
            <Tag />
          </StyledTag>
        </NamePool>
      </StyledCardName>
      <CardContent>
        {isFinished && sousId !== 0 && (
          <>
            <StyleNamePool> {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}</StyleNamePool>
          </>
        )
        }
        <StyleImgEaredDetail>
          <StyledImageEarned>
            <StyledImagePool>
              <ImageCoin>
                <img
                  src={`/images/tokens/${image || tokenName}.png`}
                  alt={tokenName}
                  style={{ width: '100%', height: '100%' }}
                />
              </ImageCoin>
            </StyledImagePool>
            <StyledCoinEarned>
              <StyledTextEarned>
              <Label
                isFinished={isFinished && sousId !== 0}
                text={TranslateString(330, `${tokenName} EARNED`)}
                colorLabel={baseColors.orange}
              />
                  </StyledTextEarned>
              {!isOldSyrup ? (
                <BalanceAndCompound>
                  <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} fontSize="20px"/>
                </BalanceAndCompound>
              ) : (
                  <OldSyrupTitle hasBalance={accountHasStakedBalance} />
                )}
            </StyledCoinEarned>
          </StyledImageEarned>

          <DetailPool>
            <StyledDetails style={{ marginBottom: '26px' }}>
              <StyleFlexDetail isFinished={isFinished}>{TranslateString(736, 'APR')}:</StyleFlexDetail>
              {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
                '-'
              ) : (
                  <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
                )}
            </StyledDetails>
            <StyledDetails>
              <StyleFlexDetail isFinished={isFinished}>{TranslateString(384, 'Your Stake')}:</StyleFlexDetail>
              <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
            </StyledDetails>
          </DetailPool>
        </StyleImgEaredDetail>

        <StyledHarvestCompound>
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
          {!isOldSyrup && sousId === 0 && account && harvest && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
              onClick={onPresentCompound}
            />
          )}
        </StyledHarvestCompound>
        <StyledAddButton>
        {!isOldSyrup && !needsApproval &&  (
            <IconButton disabled={isFinished && sousId !== 0} onClick={onPresentDeposit} variant="secondary">
              <AddIcon color='#DDFFED' />
            </IconButton>
          )}
        </StyledAddButton>
        <StyledCardActions>
          {!account && <UnlockButton style={{ maxWidth: '143px' }} />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <ButtonApprove
                disabled={isFinished || requestedApproval}
                onClick={handleApprove}
                marginBottom='10px'
                marginTop='10px'
                style={{ maxWidth: '143px'}}
                isDisable={isFinished || requestedApproval}
              >
                {`Approve ${stakingTokenName}`}
              </ButtonApprove>
            ) : (
                <>
                  <ButtonUnstake
                    disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                    isDisable={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                    marginBottom='10px'
                    marginTop='10px'
                    onClick={
                      isOldSyrup
                        ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                        : onPresentWithdraw
                    }

                    style={{ maxWidth: '143px', minWidth: '120px' }}
                  >
                    {`Unstake ${stakingTokenName}`}
                  </ButtonUnstake>
                </>
              ))}

          <ButtonDetail onClick={handleClick} style={{ minWidth: '143px' }}  marginBottom='10px' marginTop='10px' >
            {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
          </ButtonDetail>
        </StyledCardActions>
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
      </CardContent>
    </Card>

  )
}


const BalanceAndCompound = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.nav} {
  }
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
  flex-wrap:wrap;
`

const StyledCardName = styled.div`

`

const NamePool = styled(Flex)`
  order: 1;
  height: 60px;
  align-self: flex-start;
`
const ImageCoin = styled.div`
  width: 28px;
  height: 28px;
  margin: 0 auto;
`
const StyledImagePool = styled(Flex)`
  margin-right:10px;
  padding-left: 10px;
`

const StyledCoinEarned = styled(Flex)`
  flex:50%;
  flex-direction:column;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction:column;
  }
`
const DetailPool = styled.div`
  flex:50%;
  padding: 10px;
  ${({ theme }) => theme.mediaQueries.nav} {
  }
`

const StyledCardActions = styled.div`
  display: flex;
  box-sizing: border-box;
  order: 5;
  align-self: center;
  align-items: center;
  padding: 15px;
  width:100%;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.nav} {
    // justify-content: space-between;
  }
  flex-wrap: wrap;
`

const StyleFlexDetail = styled.div<{ isFinished: boolean }>`
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  ${(props) =>
    props.isFinished &&
    css`
      opacity: 0.5;
    `}
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`

const ButtonDetail = styled(Button)`
  border: 1px solid ${baseColors.primary};
  border-radius: 10px;
  color: #0085ff;
  background-color: ${({ theme }) => (theme.isDark ? darkColors.background : lightColors.background)};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`
const StyledTriangle = styled.div<{ isFinished: boolean }>`
    width: 0;
    height: 0;
    border-bottom: 60px solid ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
    ${(props) =>
    props.isFinished &&
    css`
      border-bottom: 60px solid #17C267;
    `}
    border-right: 30px solid transparent;
    position: absolute;
    left: 100%;
    right: auto;
    display: block;
    height: 100%;
    top: -1px;
    &:before {
      content: "";
      content: "";
    width: 1px;
    display: block;
    background:  ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
    height:59px;
    transform: skewX(
    27deg
    );
    position: absolute;
    left: 15px;
    top: 0px;
    }
`

const StyledTag = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
  background-color:  ${({ theme }) => (theme.isDark ? '#151C31' : 'transparent')};  
  width: 200px;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
`

const StyleNamePool = styled.div`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  white-space: nowrap; 
  text-overflow: ellipsis;
  overflow: hidden; 
  padding:24px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-weight: bold;
  line-height: 29px;
  font-size: 18px;
  align-self: flex-start; 
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
  &:hover{
    >div{
      visibility: visible;
    }
  }
 
`
const StyledTooltip = styled.div`
visibility: hidden;
width: fit-content;
top: -32px;
background-color: black;
color: #ffff;
text-align: center;
border-radius: 6px;
padding: 5px 0;
position: absolute;
z-index: 1;isFinished
  font-size: 18px;
}
`

const StyleImgEaredDetail = styled(Flex)`
  justify-content: center;
  margin-top:20px;
  margin-bottom:20px;
  width: 100%;
`

const StyledImageEarned = styled(Flex)`
  flex:50%;
  padding:8px;
`

const StyleNameFinished = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #DDFFED;
  padding:20px;
`
const StyledHarvestCompound = styled(Flex)`
  flex-wrap:wrap;
  padding: 24px;
  border-bottom: 1px solid #E2E2E8;
  margin-bottom:13px;
  min-width: 80%;
  ${({ theme }) => theme.mediaQueries.nav} {
    // min-width: 280px;
  }
`
const StyledAddButton =styled(Flex)`
  padding-right: 42px;
  width: 100%;
  justify-content: flex-end;
`

const StyledTextEarned = styled.div`
  margin-bottom:25px;
`

const ButtonApprove = styled(Button)<{isDisable:boolean}>`
  background: ${({ isDisable }) => !isDisable && '#0085FF'};
  font-weight: 600;
font-size: 16px;
line-height: 20px;
`

const ButtonUnstake = styled(Button)<{isDisable:boolean}>`
  background: ${({ isDisable }) => !isDisable && '#0085FF'};
  font-weight: 600;
font-size: 16px;
line-height: 20px;
`

export default PoolCard
