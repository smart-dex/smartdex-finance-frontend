import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Link, Card } from '@pancakeswap-libs/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'
import { ButtonPrimary, ButtonSecondary, ButtonBorder } from '../../style/Button'

const LaunchIfoCallout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 10px 0 50px;

  ${({ theme }) => theme.mediaQueries.sm} {
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
    color: rgba(95, 94, 118, 0.7);
    padding-left: 16px;
    list-style: none;
    position: relative;
    &:before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #5f5e76;
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
  border: 1px solid #e2e2e8;
  border-radius: 40px;
  padding: 25px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 50px 36px 50px 50px;
  }
`
const WrapHeading = styled(Heading)`
  color: #5f5e76;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
    line-height: 22px;
  }
`
const WrapGridButton = styled('div')`
  display: flex;
  margin-bottom: 20px;
  & > a {
    width: 150px;
    max-width: 100%;
    margin-right: 20px;
  }
`
const WrapText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: rgba(95, 94, 118, 0.7);
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    line-height: 22px;
  }
`
const LinkPrimary = styled(Link)`
  ${ButtonPrimary}
`
const LinkSecondary = styled(Link)`
  ${ButtonSecondary}
`
const LinkPrimaryPd30 = styled(Link)`
  ${ButtonPrimary}
  padding: 0 30px;
`
const LinkButtonBorder = styled(Link)`
  ${ButtonBorder}
  padding: 0 30px;
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
          <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
          <WrapHeading mb="16px">{TranslateString(594, 'Before Sale')}:</WrapHeading>
          <List>
            <li>{TranslateString(596, 'Buy CAKE and BNB tokens')}</li>
            <li>{TranslateString(598, 'Get CAKE-BNB LP tokens by adding CAKE and BNB liquidity')}</li>
          </List>
          <WrapGridButton>
            <LinkPrimary href="https://exchange.pancakeswap.finance/#/swap" mr="16px">
              {TranslateString(1060, 'Buy CAKE')}
            </LinkPrimary>
            <LinkSecondary href="https://exchange.pancakeswap.finance/#/add/ETH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82">
              {TranslateString(1062, 'Get LP tokens')}
            </LinkSecondary>
          </WrapGridButton>
          <WrapHeading mb="16px">{TranslateString(600, 'During Sale')}:</WrapHeading>
          <List>
            <li>{TranslateString(602, 'While the sale is live, commit your CAKE-LP tokens to buy the IFO tokens')}</li>
          </List>
          <WrapHeading mb="16px">{TranslateString(604, 'After Sale')}:</WrapHeading>
          <List>
            <li>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
            <li>{TranslateString(608, 'Done!')}</li>
          </List>
          <Text as="div">
            <LinkButtonBorder href="https://docs.pancakeswap.finance/core-products/ifo-initial-farm-offering">
              {TranslateString(610, 'Read more')}
            </LinkButtonBorder>
          </Text>
        </WrapCard>
        <WrapCard>
          <div>
            <Title as="h2">{TranslateString(512, 'Want to launch your own IFO?')}</Title>
            <WrapText mb={3}>
              {TranslateString(
                514,
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
