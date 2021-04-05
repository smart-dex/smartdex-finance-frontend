import React, { useMemo, useState } from 'react'
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
margin-right: 0px;
${({ theme }) => theme.mediaQueries.nav} {
  max-width: 400px;
  margin-right: 42px;
}
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  // height: ${(props) => (props.expanded ? '100%' : '0px')};
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
const DetailInFo = styled.div`
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
  flex-wrap:wrap;
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
  const isTest = process.env.REACT_APP_CHAIN_ID === '97'
  const linkScan = isTest ? `https://testnet.bscscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}` : `https://bscscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { pid, } = useFarmFromSymbol(farm.lpSymbol)
  const { earnings, stakedBalance } = useFarmUser(pid)
  const rawStakedBalance = getBalanceNumber(stakedBalance)

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

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('SMARTDEXCHAIN', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'SDC'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)
  const { quoteTokenAdresses, quoteTokenSymbol, lpTokenBalanceMC, tokenAddresses, poolWeight, tokenSymbol, lpTotalSupply, tokenBalanceLP, quoteTokenBlanceLP } = farm
  const poolRate = (BLOCKS_PER_WEEK.times(SDC_PER_BLOCK.times(new BigNumber(poolWeight))))
  const displayPoolRate = poolRate.toFixed(2).toString()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const userPoolRate = (new BigNumber(rawStakedBalance).div(lpTokenBalanceMC)).times(100)
  const displayUserPoolRate = userPoolRate.toFixed(2)


  const handelOpenDetail = () => {
    setShowExpandableSection(!showExpandableSection)
  }
  return (
    <FCard>
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
              <InfoTextFarm bold style={{ display: 'flex' }}>
                {farm.apy ? (
                  <>
                    <ApyButton
                      lpLabel={lpLabel}
                      addLiquidityUrl={addLiquidityUrl}
                      sdcPrice={sdcPrice}
                      apy={farm.apy}
                    />
                    {farmAPY}%
                  </>
                ) : (
                    <Skeleton height={24} width={80} />
                  )}
              </InfoTextFarm>
            </Detail>
          )}
          <Detail mb="37px" >
            <DetailInFo>{TranslateString(999, 'Total Deposits')}: </DetailInFo>
            <InfoTextFarm bold style={{ display: 'flex' }}>
              {lpTokenBalanceMC ? (
                <>
                  {lpTokenBalanceMC} {lpLabel}
                </>
              ) : (
                  <Skeleton height={24} width={80} />
                )}
            </InfoTextFarm>
          </Detail>
          <Detail mb="37px" >
            <DetailInFo>{TranslateString(999, 'Pool Rate')}: </DetailInFo>
            <InfoTextFarm bold style={{ display: 'flex' }}>
              {!poolRate.isNaN() ? (
                <>
                  {`${displayPoolRate} SDC/${TranslateString(999, 'WEEK')}`}
                </>
              ) : (
                  <Skeleton height={24} width={80} />
                )}
            </InfoTextFarm>
          </Detail>
          <Detail mb="37px" >
            <DetailInFo>{TranslateString(999, 'Your Pool Rate')}: </DetailInFo>
            <InfoTextFarm bold style={{ display: 'flex' }}>
              {!userPoolRate.isNaN() ? (
                <>
                  {displayUserPoolRate}%
                  </>
              ) : (
                  <Skeleton height={24} width={80} />
                )}
            </InfoTextFarm>
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
        />
        {showExpandableSection && (
          <ExpandingWrapper expanded={showExpandableSection}>
            <DetailsSection
              removed={removed}
              poolRate={poolRate}
              bscScanAddress={linkScan}
              totalValueFormated={totalValueFormated}
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
            />
          </ExpandingWrapper>
        )}
      </CardContent>

    </FCard>
  )
}

export default FarmCard
