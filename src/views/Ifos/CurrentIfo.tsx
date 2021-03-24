import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Link, Card} from 'uikit-sotatek'
import { baseColors, brandColors, darkColors, lightColors } from 'style/Color'
import { ChevronDown} from 'react-feather'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'
import { ButtonPrimary, ButtonSecondary } from '../../style/Button'

const LaunchIfoCallout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 10px 0 50px;
  width:85%;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
`
const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 8px;
    color: ${lightColors.colorWap};
    padding-left: 16px;
    list-style: none;
    position: relative;
    &:before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: ${lightColors.textMenuLeft};
      position: absolute;
      left: 0px;
      top: 7px;
      border-radius: 50%;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > li {
      font-size: 14px;
      line-height: 20px;
    }
  }
`
const WrapCard = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  border-radius: 40px;
  padding: 25px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 50px 36px 50px 50px;
  }
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
`
const WrapHeading = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.textMenuLeft)};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
    line-height: 22px;
  }
  @media (max-width: 767px) {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
  }
`
const WrapGridButton = styled('div')`
  display: flex;
  margin-bottom: 20px;
  & > a {
    min-width: 120px;
    max-width: 100%;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > a {
      min-width: 150px;
      max-width: 100%;
      margin-right: 20px;
    }
  }
`
const WrapText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    line-height: 22px;
  }
`
const LinkPrimary = styled(Link)`
  ${ButtonPrimary}
  border-radius:28px;
  &:hover{
    opacity:0.5;
  }
`
const LinkSecondary = styled(Link)`
  ${ButtonSecondary}
  border-radius:28px;
  color: ${lightColors.buttonSecond};
  box-shadow:none;
  border: 1px solid #0085FF;
  padding:0 5px;
  &:hover{
    background-color:${lightColors.buttonSecond};
    color:${brandColors.white};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding:0 20px;
  }
`
const LinkPrimaryPd30 = styled(Link)`
  ${ButtonPrimary}
  padding: 0 30px;
  border-radius:28px;
  &:hover{
    opacity:0.5;
  }
`
const LinkButtonBorder = styled(Link)`
  color: #fff;
  height: 56px;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
  justify-content: center;
  margin-left:7px;
  &:hover {
    text-decoration: none;
  }
  padding: 0 30px;
  color: ${baseColors.primary};
  border: 1px solid ${baseColors.primary};
  &:hover {
    background: ${baseColors.primary};
    border-color: ${baseColors.primary};
    text-decoration: none;
    color: #fff;
  }
`
const StyleTitle = styled(Text)`
  h2 {
    color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
    @media (max-width: 767px) {
      font-weight: normal;
      font-size: 18px;
      line-height: 22px;
    }
  }
`
const StyleList = styled(Text)`
  li {
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
    &:before {
      color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.textMenuLeft)};
    }
    @media (max-width: 767px) {
      font-weight: bold;
      &:before {
        background: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
      }
    }
  }
`
const TitleEnd = styled(Text)`
  @media (max-width: 767px) {
    h2 {
      font-weight: bold;
    }
  }
`
/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {

const TranslateString = useI18n()
return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <WrapCard>
          <StyleTitle>
            <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
          </StyleTitle>
          <WrapHeading mb="16px">{TranslateString(594, 'Before Sale')}:</WrapHeading>
          <StyleList>
            <List>
              <li>{TranslateString(596, 'Buy CAKE and BNB tokens')}</li>
              <li>{TranslateString(598, 'Get CAKE-BNB LP tokens by adding CAKE and BNB liquidity')}</li>
            </List>
          </StyleList>
          <WrapGridButton>
            <LinkPrimary href="https://exchange.pancakeswap.finance/#/swap" mr="16px">
              {TranslateString(1060, 'Buy CAKE')}
            </LinkPrimary>
            <LinkSecondary href="https://exchange.pancakeswap.finance/#/add/ETH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82">
              {TranslateString(1062, 'Get LP tokens')}
              <ChevronDown />
            </LinkSecondary>
          </WrapGridButton>
          <WrapHeading mb="16px">{TranslateString(600, 'During Sale')}:</WrapHeading>
          <StyleList>
            <List>
              <li>
                {TranslateString(602, 'While the sale is live, commit your CAKE-LP tokens to buy the IFO tokens')}
              </li>
            </List>
          </StyleList>
          <WrapHeading mb="16px">{TranslateString(604, 'After Sale')}:</WrapHeading>
          <StyleList>
            <List>
              <li>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
              <li>{TranslateString(608, 'Done!')}</li>
            </List>
          </StyleList>
          <Text as="div">
            <LinkButtonBorder href="https://docs.pancakeswap.finance/core-products/ifo-initial-farm-offering">
              {TranslateString(610, 'See more')}
            </LinkButtonBorder>
          </Text>
        </WrapCard>
        <WrapCard>
          <div>
            <StyleTitle>
              <TitleEnd>
                <Title as="h2">{TranslateString(512, 'Want to launch your own IFO?')}</Title>
              </TitleEnd>
            </StyleTitle>
            <WrapText mb={3}>
              {TranslateString(514,
                'Launch your project with PancakeSwap, Binance Smart Chain’s most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on BSC.',
              )}
            </WrapText>
            <LinkPrimaryPd30 href="https://docs.google.com/forms/d/e/1FAIpQLScGdT5rrVMr4WOWr08pvcroSeuIOtEJf1sVdQGVdcAOqryigQ/viewform">
              {TranslateString(516, 'Apply to launch')}
            </LinkPrimaryPd30>
          </div>
        </WrapCard>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
