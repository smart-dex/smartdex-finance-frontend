import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Skeleton } from 'uikit-sotatek'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL, BLOCKS_PER_WEEK, SDC_PER_BLOCK } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { lightColors, darkColors } from 'style/Color'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import ReactTooltip from 'react-tooltip'
import Balance from 'components/Balance'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'





export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const FCard = styled.div`
display: flex;
border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
flex-direction: column;
min-height:400px;
max-width: 350px;
min-width: 300px;

margin-right: 12px;
margin-left: 12px;
${({ theme }) => theme.mediaQueries.nav} {
  max-width: 400px;
  margin-right: 42px;
  margin-left: 42px;
}
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  overflow: hidden;
  width:100%;
  padding: 0px 23px 22px 22px;
`
const CardContent = styled(Flex)`
  height:100%;
  border-left: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-right: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 25px 14px 102px ${({ theme }) => (theme.isDark ? darkColors.cardShadow : lightColors.cardShadow)};
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-wrap: nowrap;
  }
`
const InfoTextFarm = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const DetailValue = styled(Flex)`
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}
flex-wrap:wrap;
`
const DetailApr = styled(Flex)`
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}
span{
  max-width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`
const DetailInFo = styled.div`
  min-width: 120px; 
  flex: 1;
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledInfoEarn = styled(Flex)`
  flex-direction:column;
  justify-content: center;
  padding:20px 20px 0px 20px;
  margin-top:20px;
  width: 100%;
`

const Detail = styled(Flex)`
`

const BalanceAndCompound = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap:wrap;

  >div{
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-right: 5px;
    color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
  }
`



interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  sdcPrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, sdcPrice, bnbPrice, ethPrice, ethereum, account }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const isTest = process.env.REACT_APP_CHAIN_ID === '97'
  const linkScan = isTest ? `${process.env.REACT_APP_TESTNET_SCAN}/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}` : `${process.env.REACT_APP_BSC_SCAN}/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { pid, } = useFarmFromSymbol(farm.lpSymbol)
  const { earnings, stakedBalance, tokenBalance } = useFarmUser(pid)
  const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. SDC-BNB LP, LINK-BNB LP,
  // NAR-SDC LP. The images should be sdc-bnb.svg, link-bnb.svg, nar-sdc.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.SDC) {
      return sdcPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, sdcPrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])



  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('SMARTDEXCHAIN', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'SDC'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)
  const { quoteTokenAdresses, quoteTokenSymbol, lpTokenBalanceMC, tokenAddresses, poolWeight, tokenSymbol, lpTotalSupply, tokenBalanceLP, quoteTokenBlanceLP } = farm
  const poolRate = (BLOCKS_PER_WEEK.times(SDC_PER_BLOCK.times(new BigNumber(poolWeight))))
  const displayPoolRate = poolRate.toNumber()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const userPoolRate = account ?(stakedBalance.div(lpTokenBalanceMC)).times(100): new BigNumber(0)
  const displayLpTokenBalanceMC = getBalanceNumber(lpTokenBalanceMC)
  const displayUserPoolRate = userPoolRate.toNumber()
  
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const handelOpenDetail = () => {
    setShowExpandableSection(!showExpandableSection)
  }
  return (
    <FCard>
      <ReactTooltip place="right" type="info" effect="float" />
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={isCommunityFarm}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      <CardContent>

        <StyledInfoEarn>
          {!removed && (
            <Detail mb="37px" >
              <DetailInFo>{TranslateString(736, 'APR')}: </DetailInFo>
              <DetailApr >
                {farm.apy ? (
                  <>
                    <ApyButton
                      lpLabel={lpLabel}
                      addLiquidityUrl={addLiquidityUrl}
                      sdcPrice={sdcPrice}
                      apy={farm.apy}
                    />
                    <span data-tip={farmAPY}>{farmAPY}</span>   %
                  </>
                ) : (
                  <Skeleton height={24} width={80} />
                )}
              </DetailApr>
            </Detail>
          )}
          <Detail mb="37px" >
            <DetailInFo>{TranslateString(999, 'Total Deposits')}: </DetailInFo>
            <DetailValue>
              {lpTokenBalanceMC ? (
                <>
                  <BalanceAndCompound data-tip={displayLpTokenBalanceMC.toLocaleString('en-US')} >
                    <Balance value={displayLpTokenBalanceMC} /> <InfoTextFarm>{lpLabel}</InfoTextFarm>
                  </BalanceAndCompound>
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </DetailValue>
          </Detail>
          <Detail mb="37px" >
            <DetailInFo>{TranslateString(999, 'Pool Rate')}: </DetailInFo>
            <DetailValue>
              {!poolRate.isNaN() ? (
                <>
                  <BalanceAndCompound data-tip={displayPoolRate.toLocaleString('en-US')}>
                    <Balance fontSize="32px" value={displayPoolRate} />  <InfoTextFarm> {`SDC/${TranslateString(999, 'WEEK')}`}</InfoTextFarm>
                  </BalanceAndCompound>
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </DetailValue>
          </Detail>
          <Detail mb="37px" >
            <DetailInFo>{TranslateString(999, 'Your Pool Rate')}: </DetailInFo>
            <DetailValue>
              {!userPoolRate.isNaN() ? (
                <>
                  <BalanceAndCompound data-tip={displayUserPoolRate.toLocaleString('en-US')}>
                    <Balance fontSize="32px" value={displayUserPoolRate} decimals={3} />  <InfoTextFarm>%</InfoTextFarm>
                  </BalanceAndCompound>
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </DetailValue>
          </Detail>

        </StyledInfoEarn>


        <CardActionsContainer
          farm={farm}
          ethereum={ethereum}
          account={account}
          removed={removed}
          addLiquidityUrl={addLiquidityUrl}
          changeOpenDetail={handelOpenDetail}
          isOpenDetail={showExpandableSection}
          earnLabel={earnLabel}
          pendingTx={pendingTx}
          setPendingTx={setPendingTx}
        />
        {showExpandableSection && !(tokenBalance.eq(0) && stakedBalance.eq(0)) && account && (
          <ExpandingWrapper expanded={showExpandableSection}>
            <DetailsSection
              removed={removed}
              poolRate={poolRate}
              bscScanAddress={linkScan}
              totalValue={totalValue}
              lpLabel={lpLabel}
              addLiquidityUrl={addLiquidityUrl}
              earnings={earnings}
              pid={pid}
              quoteTokenSymbol={quoteTokenSymbol}
              tokenSymbol={tokenSymbol}
              lpTokenBalanceMC={lpTokenBalanceMC}
              lpTotalSupply={lpTotalSupply}
              tokenBalanceLP={tokenBalanceLP}
              quoteTokenBlanceLP={quoteTokenBlanceLP}
              pendingTx={pendingTx}
              setPendingTx={setPendingTx}
            />
          </ExpandingWrapper>
        )}
      </CardContent>

    </FCard>
  )
}

export default FarmCard
