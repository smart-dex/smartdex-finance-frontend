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
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import { baseColors } from '../../../../style/Color'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const FCard = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 25px 14px 102px rgba(83, 185, 234, 0.14);
  display: flex;
  flex-direction: column;
  position: relative;
  &:hover {
    border: 1px solid ${ baseColors.primary};
    transition: 0.25s;
  }
  position: relative;
  margin-bottom: 16px;
  @media (max-width: 968px) {
    max-width: 450px;
  }
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const CardContent = styled(Flex)`
  display: flex;
  flex-direction: row;
  padding: 0;
  // align-items:center;
  padding: 24px;
  @media (max-width: 968px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`

const InfoFarm = styled(Flex)`
  flex-grow: 1;
`
const InfoTextFram = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
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
      <CardContent>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={isCommunityFarm}
          farmImage={farmImage}
          tokenSymbol={farm.tokenSymbol}
        />
        <InfoFarm flexDirection="column" justifyContent="center" marginRight="16px">
          {!removed && (
            <Flex alignItems="center" justifyContent="center">
              <Text style={{ flex: 1 }}>{TranslateString(736, 'APR')}: </Text>
              <InfoTextFram bold style={{ display: 'flex', alignItems: 'center' }}>
                {farm.apy ? (
                  <>
                    <ApyButton
                      lpLabel={lpLabel}
                      addLiquidityUrl={addLiquidityUrl}
                      cakePrice={cakePrice}
                      apy={farm.apy}
                    />
                    {farmAPY}%
                  </>
                ) : (
                  <Skeleton height={24} width={80} />
                )}
              </InfoTextFram>
            </Flex>
          )}
          <Flex justifyContent="center">
            <Text style={{ flex: 1 }}>{TranslateString(318, 'Earn')}:</Text>
            <InfoTextFram bold>{earnLabel}</InfoTextFram>
          </Flex>
        </InfoFarm>
        <CardActionsContainer
          farm={farm}
          ethereum={ethereum}
          account={account}
          addLiquidityUrl={addLiquidityUrl}
          changeOpenDetail={handelOpenDetail}
          isOpenDetail={showExpandableSection}
        />
        {/* <ExpandableSectionButton
            onClick={() => setShowExpandableSection(!showExpandableSection)}
            expanded={showExpandableSection}
          /> */}
      </CardContent>
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
    </FCard>
  )
}

export default FarmCard
