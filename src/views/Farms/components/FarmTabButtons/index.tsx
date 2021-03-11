import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { lightColors, baseColors, darkColors } from 'style/Color'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'

const FarmTabButtons = ({ stackedOnly, setStackedOnly }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
        <Text> {TranslateString(1116, 'Staked only')}</Text>
      </ToggleWrapper>
      <ButtonMenuStyle>
        <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
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

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  justify-content: center;
  flex-warp: wrap;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  margin-bottom: 16px;
  ${Text} {
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
    margin-left: 13px;
    font-size: 16px;
    line-height: 143%;
    letter-spacing: -0.03em;
    font-size: 13px;
    color: ${({ theme }) => (theme.isDark ? darkColors.stakedOnly : lightColors.stakedOnly)};
  }
`
const ButtonItemStyle = styled(ButtonMenuItem)`
  padding: 20px;
  border-radius: 50px;
  background-color: ${({ isActive }) => (isActive ? baseColors.primary : '')};
  color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
  width: 100px;
  font-size: 13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: 135px;
  }

  line-height: 20px;
  font-weight: 400;
`
const ButtonMenuStyle = styled.div`
  margin-bottom: 16px;
  & > div {
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 270px;
    }
    width: 200px;
    border-radius: 50px;
  }
`
