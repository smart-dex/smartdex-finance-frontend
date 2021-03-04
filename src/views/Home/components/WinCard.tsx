import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'

const StyledFarmStakingCard = styled(Card)`
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
  color: #5f5e76;
  font-weight: 500;
`
const NavLinkStyle = styled(NavLink)`
  background: #d8f7e4;
  width: 30px;
  height: 30px;
  border-radius: 12px;
  margin-top: 28px;
`

const WinCard = () => {
  const lotteryPrize = Math.round(useLotteryTotalPrizesUsd()).toLocaleString()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <HeadingEarn color="contrast" size="lg">
          Lottery with
        </HeadingEarn>
        <CardMidContent color="#0085FF">${lotteryPrize}</CardMidContent>
        <Flex justifyContent="space-between">
          <HeadingEarn color="contrast" size="lg">
            up for grabs
          </HeadingEarn>
          <NavLinkStyle exact activeClassName="active" to="/lottery" id="lottery-pot-cta">
            <ArrowForwardIcon color="primary" style={{ margin: '5px' }} />
          </NavLinkStyle>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default WinCard
