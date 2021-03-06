import React, { useCallback, useRef } from 'react'
import { darkColors, lightColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'smartdex-uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd, usePriceEthBusd, usePriceSdcBusd } from 'state/hooks'
import { BLOCKS_PER_YEAR, SDC_PER_BLOCK, SDC_POOL_PID } from 'config'
import useRefresh from 'hooks/useRefresh'

const StyledFarmStakingCard = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
  border-radius: 40px;
  margin-bottom: 25px;
  min-height: 203px;
  padding-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    min-height: 230px;
    margin-bottom: 20px;
  }
`
const HeadingEarn = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
    line-height: 30px;
  }
`
const CardMidContent = styled(Heading)`
  line-height: 44px;
  font-weight: 600;
  color: ${baseColors.primary};
  font-size: 32px;
  ${({ theme }) => theme.mediaQueries.nav} {
    color: ${baseColors.success};
    font-size: 22px;
  }
`
const NavLinkStyle = styled(NavLink)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backgroundArrowMb : lightColors.backgroundArrowMb)};
  width: 30px;
  height: 30px;
  border-radius: 12px;
  position: relative;
  margin-left: auto;
  padding-top: 1px;
  text-align: center;
  position: absolute;
  left: auto;
  right: 24px;
  bottom: 22px;
  ${({ theme }) => theme.mediaQueries.nav} {
    background: ${({ theme }) => (theme.isDark ? darkColors.backgroundArrow : lightColors.backgroundArrow)};
    left: 24px;
    right: auto;
  }
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const { fastRefresh } = useRefresh()
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()
  const sdcPrice = usePriceSdcBusd()
  const maxAPY = useRef(Number.MIN_VALUE)
  const getHighestAPY = () => {
    const activeFarms = farmsLP
    calculateAPY(activeFarms)
    return  maxAPY.current? (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1): "0.00"
  }
  const calculateAPY = 
    (farmsToDisplay) => {
      const result = farmsToDisplay.map((farm) => {
        const sdcPriceInQuote = new BigNumber(farm.tokenPriceVsQuote)
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const sdcRewardPerYear = farm.sdcPerYear

        // sdcPriceInQuote * sdcRewardPerYear / lpTotalInQuoteToken
        const apy = sdcPriceInQuote.times(sdcRewardPerYear).div(farm.lpTotalInQuoteToken) 
      
        // if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()
        return !apy.isNaN() ? apy.toNumber(): 0
      })
      
      maxAPY.current=Math.max(...result)    
    }
  

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <HeadingEarn>{TranslateString(1199, 'Earn up to')}</HeadingEarn>
        <CardMidContent>
          {getHighestAPY() || maxAPY.current  ? (
            `${getHighestAPY()}% ${TranslateString(736, 'APR')}`
          ) : (
              <Skeleton animation="pulse" variant="rect" height="44px" />
            )}
        </CardMidContent>
        <Flex style={{ flexDirection: 'column' }}>
          <HeadingEarn>{TranslateString(1201, 'in Farms')}</HeadingEarn>
          <NavLinkStyle exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon color="#17C267" width={18} style={{ margin: '5px' }} />
          </NavLinkStyle>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
