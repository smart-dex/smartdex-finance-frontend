import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { Button, useModal, Flex } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { ChevronDown, ChevronUp } from 'react-feather'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { lightColors, darkColors, baseColors } from 'style/Color'
import Balance from 'components/Balance'
import StartModal from './StartModal'
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
  const [requestedApproval, setRequestedApproval] = useState(false)
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
  const [onStart] = useModal(
    <StartModal
      accountHasStakedBalance={accountHasStakedBalance}
      tokenName={tokenName}
      sousId={sousId}
      isBnbPool={isBnbPool}
      earnings={earnings}
      stakingTokenName={stakingTokenName}
      stakedBalance={stakedBalance}
      isOldSyrup={isOldSyrup}
      needsApproval={needsApproval}
      account={account}
      stakingLimit={stakingLimit}
      stakingTokenBalance={stakingTokenBalance}
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
                  <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} fontSize="20px" />
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
        <Line />
      
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
                  <ButtonStart
                    marginBottom='10px'
                    marginTop='10px'
                    onClick={onStart}
                  >
                     {TranslateString(999, 'Start')}
                </ButtonStart>
                </>
              ))}
          {account && !needsApproval &&
            <ButtonDetail onClick={handleClick} marginBottom='10px' marginTop='10px' isShow={isOpenDetail}>
              {isOpenDetail ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
            </ButtonDetail>
          }
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
      visibility: visible;
    }
  }
 
`
const StyledTooltip = styled.div`
visibility: hidden;
width: fit-content;
top: -32px;
background-color: black;
color: #fffff;
text-align: center;
border-radius: 6px;
padding: 5px 0;
position: absolute;
z-index: 1;
  font-size: 18px;
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
  flex:50%;
  padding-right:10px;
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
  filter:  ${({ isDisable }) => isDisable ? '' : 'drop-shadow(0px 4px 10px rgba(111, 180, 143, 0.24))'} ;
  border-radius: 10px;
  box-shadow: none;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const ButtonStart = styled(Button)`
    background: #0085FF;
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    border-radius: 10px;
    width: calc(50% - 9px);
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
`

export default PoolCard
