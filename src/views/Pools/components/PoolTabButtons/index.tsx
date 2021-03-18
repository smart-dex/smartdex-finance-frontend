import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Toggle, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { baseColors, lightColors, darkColors } from 'style/Color'

const PoolTabButtons = ({ stackedOnly, setStackedOnly }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
        <Text> {TranslateString(999, 'Staked only')}</Text>
      </ToggleWrapper>
      <ButtonMenuStyle>
        <ButtonMenu activeIndex={isExact ? 0 : 1}>
          <ButtonItemStyle as={Link} to={`${url}`}>
            {TranslateString(698, 'Active')}
          </ButtonItemStyle>
          <ButtonItemStyle as={Link} to={`${url}/history`}>
            {TranslateString(700, 'Inactive')}
          </ButtonItemStyle>
        </ButtonMenu>
      </ButtonMenuStyle>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  margin-bottom: 16px;
  ${Text} {
    margin-left: 13px;
    line-height: 143%;
    letter-spacing: -0.03em;
    font-size: 13px;
    color: ${({ theme }) => (theme.isDark ? darkColors.stakedOnly : lightColors.stakedOnly)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
  }
`
const ButtonItemStyle = styled(ButtonMenuItem)`
  padding: 20px;
  border-radius: 50px;
  background-color: ${({ isActive }) => (isActive ? baseColors.primary : '')};
  color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
  width: 100px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;

  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: 135px;
  }
`
const ButtonMenuStyle = styled.div`
  margin-bottom: 16px;
  border-radius: 50px;
  > div {
    border-radius: 50px;
  }
`
