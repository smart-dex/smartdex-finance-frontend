import React from 'react'
import { darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from 'uikit-sotatek'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  min-height: 308px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
  border-radius: 40px;
  margin-bottom: 25px;
  ${({ theme }) => theme.mediaQueries.nav} {
    min-height: 393px;
    margin-bottom: 20px;
  }
`
const HeadingEarn = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
    margin-bottom: 24px;
  }
`
const Row = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 20px;
  }
`
const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  margin-bottom: 5px;
  ${({ theme }) => theme.mediaQueries.nav} {
    color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
    font-weight: 600;
    font-size: 14px;
    line-height: 40px;
  }
`

const StyleNumber = styled(Text)`
  div {
    font-size: 16px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 24px;
    }
  }
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledCakeStats>
      <CardBody>
        <HeadingEarn mb="24px">{TranslateString(534, 'SDC Stats')}</HeadingEarn>
        <Row>
          <TextStyle>{TranslateString(536, 'Total SDC Supply')}</TextStyle>
          {cakeSupply && <StyleNumber><CardValue bold value={cakeSupply} /></StyleNumber>}
        </Row>
        <Row>
          <TextStyle>{TranslateString(538, 'Total SDC Burned')}</TextStyle>
          <StyleNumber><CardValue decimals={0} bold value={getBalanceNumber(burnedBalance)} /></StyleNumber>
        </Row>
        <Row>
          <TextStyle>{TranslateString(540, 'New SDC/block')}</TextStyle>
          <StyleNumber><CardValue decimals={0} bold value={40} /></StyleNumber>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
