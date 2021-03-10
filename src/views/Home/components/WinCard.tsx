import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'
import { darkColors, lightColors, baseColors } from '../../../style/Color'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  border: 1px solid ${ lightColors.borderColor };
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading)`
  line-height: 44px;
  font-weight: 600;
  color: ${ baseColors.success };
  font-size: 22px;
`

const HeadingEarn = styled(Heading)`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`
const NavLinkStyle = styled(NavLink)`
  background: ${ lightColors.arrowColor };
  width: 30px;
  height: 30px;
  border-radius: 12px;
  margin-top: 65px;
  @media (max-width: 600px) {
    margin-top: 28px;
  }
`

const WinCard = () => {
  const lotteryPrize = Math.round(useLotteryTotalPrizesUsd()).toLocaleString()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <HeadingEarn>
          Lottery with
        </HeadingEarn>
        <CardMidContent>${lotteryPrize}</CardMidContent>
        <Flex style={{flexDirection: 'column'}}>
          <HeadingEarn>
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
