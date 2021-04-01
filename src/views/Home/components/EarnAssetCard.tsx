import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { lightColors, darkColors } from '../../../style/Color'

const StyledFarmStakingCard = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: linear-gradient(91.67deg, #0085ff 5.33%, #7e86ff 104.39%);
  margin-bottom: 25px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 20px;
  }
`
const CardBodyStyle = styled(CardBody)`
  min-height: 203px;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding-top: 35px;
    min-height: 255px;
  }
`
const HeadingEarn = styled(Heading)`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  ${({ theme }) => theme.mediaQueries.nav} {
    line-height: 30px;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  font-weight: 600;
  font-size: 22px;
  color: ${lightColors.invertedContrast};
`
const NavLinkStyle = styled(NavLink)`
  background: rgba(255, 255, 255, 0.2);
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
    left: 24px;
    right: auto;
  }
`

const EarnAssetCard = () => {
  const activeNonSdcPools = pools.filter((pool) => !pool.isFinished && !pool.tokenName.includes('SDC'))
  const latestPools: Pool[] = orderBy(activeNonSdcPools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include SDC
  const assets = ['SDC', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBodyStyle>
        <HeadingEarn>Earn</HeadingEarn>
        <CardMidContent>{assets}</CardMidContent>
        <Flex style={{ flexDirection: 'column' }}>
          <HeadingEarn>in Pools</HeadingEarn>
          <NavLinkStyle exact activeClassName="active" to="/syrup" id="pool-cta">
            <ArrowForwardIcon mt={30} color="#FFFFFF" style={{ margin: '5px' }} />
          </NavLinkStyle>
        </Flex>
      </CardBodyStyle>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
