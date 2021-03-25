import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { darkColors, lightColors } from '../../../style/Color'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 20px;
`

const HeadingEarn = styled(Heading)`
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 32px;
  }
`

const CardBodyStyle = styled(CardBody)`
  ${({ theme }) => theme.mediaQueries.nav} {
    padding: 29px 47px 30px 38px;
  }
`
const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 14px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledCakeStats>
      <CardBodyStyle>
        <HeadingEarn mb="24px">{TranslateString(534, 'Cake Stats')}</HeadingEarn>
        <Row>
          <TextStyle>{TranslateString(536, 'Total CAKE Supply')}</TextStyle>
          {cakeSupply && <CardValue fontSize="14px" bold={false} value={cakeSupply} />}
        </Row>
        <Row>
          <TextStyle>{TranslateString(538, 'Total CAKE Burned')}</TextStyle>
          <CardValue fontSize="14px" bold={false} value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <TextStyle>{TranslateString(540, 'New CAKE/block')}</TextStyle>
          <CardValue fontSize="14px" decimals={0} bold={false} value={40} />
        </Row>
      </CardBodyStyle>
    </StyledCakeStats>
  )
}

export default CakeStats
