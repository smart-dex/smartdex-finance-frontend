import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(91.67deg, #0085ff 5.33%, #7e86ff 104.39%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border: 1px solid #e2e2e8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  font-weight: 500;
`

const HeadingEarn = styled(Heading)`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`

const NavLinkStyle = styled(NavLink)`
  background: rgba(255, 255, 255, 0.2);
  width: 30px;
  height: 30px;
  border-radius: 12px;
  margin-top: 28px;
`

const EarnAssetCard = () => {
  const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.tokenName.includes('CAKE'))
  const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include CAKE
  const assets = ['CAKE', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <HeadingEarn color="contrast" size="lg">
          Earn
        </HeadingEarn>
        <CardMidContent color="invertedContrast">{assets}</CardMidContent>
        <Flex justifyContent="space-between">
          <HeadingEarn color="contrast" size="lg">
            in Pools
          </HeadingEarn>
          <NavLinkStyle exact activeClassName="active" to="/syrup" id="pool-cta">
            <ArrowForwardIcon mt={30} color="#fff" style={{ margin: '5px' }} />
          </NavLinkStyle>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
