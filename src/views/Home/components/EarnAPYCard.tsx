import React, { useCallback, useRef } from 'react'
import { darkColors, lightColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'uikit-sotatek'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd } from 'state/hooks'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'

const StyledFarmStakingCard = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
  border-radius: 40px;
  margin-bottom: 25px;
  min-height: 203px;
  padding-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    min-height: 255px;
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
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(farm.poolWeight)
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          apy = cakeRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const cakeApy =
            farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        }

        if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [bnbPrice, farmsLP],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <HeadingEarn>Earn up to</HeadingEarn>
        <CardMidContent>
          {getHighestAPY() ? (
            `${getHighestAPY()}% ${TranslateString(736, 'APR')}`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex style={{ flexDirection: 'column' }}>
          <HeadingEarn>in Farms</HeadingEarn>
          <NavLinkStyle exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon color="#17C267" width={18} style={{ margin: '5px' }} />
          </NavLinkStyle>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
