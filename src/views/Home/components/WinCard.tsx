import React from 'react'
import { darkColors, lightColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from 'smartdex-uikit'
import { NavLink } from 'react-router-dom'
import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'
import useI18n from 'hooks/useI18n'

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
    font-size: 22px;
    color: ${baseColors.success};
  }
`
const NavLinkStyle = styled(NavLink)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backgroundArrow : lightColors.backgroundArrow)};
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

const WinCard = () => {
  const TranslateString = useI18n()
  const lotteryPrize = Math.round(useLotteryTotalPrizesUsd()).toLocaleString()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <HeadingEarn> { TranslateString( 12202, "Lottery with")}</HeadingEarn>
        <CardMidContent>${lotteryPrize}</CardMidContent>
        <Flex style={{ flexDirection: 'column' }}>
          <HeadingEarn>{ TranslateString(12203, "up for grabs")}</HeadingEarn>
          <NavLinkStyle exact activeClassName="active" to="/lottery" id="lottery-pot-cta">
            <ArrowForwardIcon color="#17C267" style={{ margin: '5px' }} />
          </NavLinkStyle>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default WinCard
