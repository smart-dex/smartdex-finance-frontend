import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Button, useModal, Flex, Text } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import ReactTooltip from 'react-tooltip'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber,getFullDisplayBalance } from 'utils/formatBalance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { ChevronDown, ChevronUp } from 'react-feather'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { lightColors, darkColors, baseColors } from 'style/Color'
import Balance from 'components/Balance'
import StartModal from './SelectModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
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
    tokenAddress,
    tokenDecimals,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
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
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = new BigNumber(userData?.allowance || 0)
  const stakedBalance = account? new BigNumber(userData?.stakedBalance || 0): new BigNumber(0)
  const earnings = account? new BigNumber(userData?.pendingReward || 0): new BigNumber(0)
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
  const [onStart] = useModal(
    <StartModal
      tokenName={tokenName}
      sousId={sousId}
      isBnbPool={isBnbPool}
      stakingTokenName={stakingTokenName}
      isOldSyrup={isOldSyrup}
      needsApproval={needsApproval}
      account={account}
      stakingLimit={stakingLimit}
      convertedLimit={convertedLimit}
      isFinished={isFinished}
      tokenDecimals={tokenDecimals}
      harvest={harvest}
    />
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
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  const rawEarning = getBalanceNumber(earnings, tokenDecimals)
  const rawUserStake= getFullDisplayBalance(stakedBalance,18,3)
  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <ReactTooltip id="title" place="top" type="info" effect="float" />
      <ReactTooltip place="right" type="info" effect="float" />
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
                <StyleNamePool data-for="title" data-tip={`${tokenName} ${TranslateString(348, 'Pool')}`}> {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
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
              <IconDirect src="/images/home/icon-pool.png" alt="" />
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
                <BalanceAndCompound data-tip={rawEarning.toFixed(3)}>
                  <Balance value={rawEarning} isDisabled={isFinished} fontSize="20px" />
                </BalanceAndCompound>
              ) : (
                <OldSyrupTitle hasBalance={accountHasStakedBalance} />
              )}
            </StyledCoinEarned>
          </StyledImageEarned>

          <DetailPool>
            <StyledDetails style={{ marginBottom: '26px' }}>
              <IconWrapper>
                <TicketImg src="/images/pan-cake.png" />
              </IconWrapper>

              <StyleFlexDetail isFinished={isFinished}>{TranslateString(736, 'APR')}:</StyleFlexDetail>
              {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ?
                (
                  <StyleFlexDetail isFinished={isFinished}> - </StyleFlexDetail>
                )
                : (
                  <StyledAprDetail data-tip={apy?.toFixed(2)}>
                    <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
                  </StyledAprDetail>

                )}
            </StyledDetails>
            <StyledDetailsStake>
              <StyleFlexDetail isFinished={isFinished}>{TranslateString(384, 'Your Stake')}:</StyleFlexDetail>
              <StyledYourStakeDetail data-tip={rawUserStake}>
                <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
              </StyledYourStakeDetail>

            </StyledDetailsStake>
          </DetailPool>
        </StyleImgEaredDetail>
        <Line />
        <BoxTextCard>
          <TextTitleCon as="p">
            {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(1250, 'LP STAKED')}
          </TextTitleCon>
        </BoxTextCard>


        <StyledCardActions>
          {!account &&
            (<StyledButtonUnlock>
              <UnlockButton />
            </StyledButtonUnlock>
            )}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <ButtonApprove
                disabled={isFinished || requestedApproval}
                marginBottom='10px'
                marginTop='10px'
                onClick={handleApprove}
                isDisable={isFinished || requestedApproval}
              >
                {`Approve ${stakingTokenName}`}
              </ButtonApprove>
            ) : (
              <>
                <ButtonSelect
                  marginBottom='10px'
                  marginTop='10px'
                  onClick={onStart}
                >
                  {TranslateString(999, 'Select')}
                </ButtonSelect>
              </>
            ))}
          {account && !needsApproval &&
            <ButtonDetail onClick={handleClick} marginBottom='10px' marginTop='10px' isShow={isOpenDetail}>
              {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
            </ButtonDetail>
          }
        </StyledCardActions>
        {isOpenDetail && account  && !needsApproval && (
          <CardFooter
            projectLink={projectLink}
            totalStaked={totalStaked}
            blocksRemaining={blocksRemaining}
            isFinished={isFinished}
            blocksUntilStart={blocksUntilStart}
            isOpenDetail={isOpenDetail}
            tokenName={tokenName}
            tokenAddress={tokenAddress}
            tokenDecimals={tokenDecimals}
          />
        )}
      </CardContent>
    </Card >

  )
}

const Line = styled.div`
  width: calc(100% - 50px);
  margin-top: 20px;
  border-top: 1px solid ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
  margin-bottom: 15px;
`


const BalanceAndCompound = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.nav} {
  }
  >div{
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 20px;
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
const StyledDetailsStake = styled.div`
  font-size: 14px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
  flex-wrap:wrap;
  margin-left: 25px;
  display: flex;
`

const StyledCardName = styled.div`

`

const NamePool = styled(Flex)`
  order: 1;
  height: 60px;
  align-self: flex-start;
`
const StyledImagePool = styled(Flex)`
  margin-right:10px;
  padding-left: 10px;
  width: 34px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 40px;
  }
`

const StyledCoinEarned = styled(Flex)`
  flex:50%;
  flex-direction:column;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction:column;
  }
`
const DetailPool = styled.div`
  padding-left: 10px;
  flex:50%;
  ${({ theme }) => theme.mediaQueries.nav} {
  }
`

const StyledCardActions = styled.div`
  display: flex;
  box-sizing: border-box;
  align-self: center;
  align-items: center;
  padding: 13px 20px 15px 20px;
  width:100%;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.nav} {
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
  margin-right:5px;
`

const ButtonDetail = styled(Button) <{ isShow: boolean }>`
  ${(props) =>
    props.isShow ?
      (
        css`
        border: 1px solid  ${({ theme }) => (theme.isDark ? darkColors.borderButtonDetail : lightColors.borderButtonDetail)};
        color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
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
  background-color: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
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
  width:200px;
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
      opacity: 1;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    }
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

const StyleImgEaredDetail = styled(Flex)`
  justify-content: center;
  padding: 10px;
  margin-top:20px;
  margin-bottom:20px;
  width: 100%;
`

const StyledImageEarned = styled(Flex)`
  border-right:1px solid ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
  flex: 50%;
  padding-right:10px;
  position: relative;
`

const StyleNameFinished = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #DDFFED;
  padding:20px;
`


const StyledTextEarned = styled.div`
  margin-bottom:25px;
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

const ButtonSelect = styled(Button)`
    background: #0085FF;
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    border-radius: 10px;
    width: calc(50% - 9px);
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
`
const IconDirect = styled.img`
  width: 26px;
  height: 26px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 28px;
    height: 28px;
  }
`
const IconWrapper = styled.div`
  svg {
    width: 48px;
    height: 48px;
  }
`

const TicketImg = styled.img`
  width: 25px;
  height: 25px;
`

const BoxTextCard = styled.div`
  display: flex;
  width: 100%;
`

const TextTitleCon = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.colorWap)};
  align-items: flex-start !important;
  margin-left: 20px;
`
const StyledAprDetail = styled.div`
>div{
  max-width: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 90px;
    font-size: 14px;
  }
`
const StyledYourStakeDetail = styled.div`
>div{
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 50px;
    font-size: 14px;
  }
`

export default PoolCard
