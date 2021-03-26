import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Skeleton } from 'uikit-sotatek'

import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { lightColors, darkColors } from 'style/Color'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import HarvestAction from './HarvestAction'
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

const InfoFarm = styled(Flex)`
padding-top: 10px;
padding-right:17px;
border-right: 1px solid ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
justify-content: flex-start;
width: 50%;
  ${({ theme }) => theme.mediaQueries.nav} {
  }
`
const InfoTextFarm = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
`
const DetailInFo = styled.div`
  flex: 1;
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`
const StyledInfoEarn = styled(Flex)`
justify-content: center;
padding:20px 20px 0px 20px;
margin-top:20px;
width: 100%;
`
const Line = styled.div`
  width: calc(100% - 50px);
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
  margin-bottom: 15px;
`
const Detail = styled(Flex)`
  flex-wrap:wrap;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, ethPrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { pid, } = useFarmFromSymbol(farm.lpSymbol)
  const { earnings } = useFarmUser(pid)
  const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'CAKE'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

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
          <InfoFarm justifyContent="center" flexDirection="column">
            {!removed && (
              <Detail mb="37px" >
                <DetailInFo>{TranslateString(736, 'APR')}: </DetailInFo>
                <InfoTextFarm bold style={{ display: 'flex' }}>
                  {farm.apy ? (
                    <>
                      {farmAPY}%
                      <ApyButton
                        lpLabel={lpLabel}
                        addLiquidityUrl={addLiquidityUrl}
                        cakePrice={cakePrice}
                        apy={farm.apy}
                      />
                  </>
                  ) : (
                      <Skeleton height={24} width={80} />
                    )}
                </InfoTextFarm>
              </Detail>
            )}
            <Detail>
              <DetailInFo>{TranslateString(318, 'Earn')}:</DetailInFo>
              <InfoTextFarm bold>{earnLabel}</InfoTextFarm>
            </Detail>
          </InfoFarm>
          <HarvestAction earnings={earnings} pid={pid} />
        </StyledInfoEarn>
        <Line />
        <CardActionsContainer
          farm={farm}
          ethereum={ethereum}
          account={account}
          addLiquidityUrl={addLiquidityUrl}
          changeOpenDetail={handelOpenDetail}
          isOpenDetail={showExpandableSection}
        />
        {showExpandableSection && (
          <ExpandingWrapper expanded={showExpandableSection}>
            <DetailsSection
              removed={removed}
              bscScanAddress={`https://bscscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`}
              totalValueFormated={totalValueFormated}
              lpLabel={lpLabel}
              addLiquidityUrl={addLiquidityUrl}
            />
          </ExpandingWrapper>
        )}
      </CardContent>

    </FCard>
  )
}

export default FarmCard
