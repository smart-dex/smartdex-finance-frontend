import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Toggle, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { baseColors, lightColors, darkColors } from 'style/Color'

const checkDarkBg = (theme) => (theme.isDark ? darkColors.buttonTabPool : lightColors.buttonTabPool)

const PoolTabButtons = ({ stackedOnly, setStackedOnly }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale='sm' />
        <Text> {TranslateString(999, 'Staked only')}</Text>
      </ToggleWrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1}>
        <ButtonItemStyle as={Link} to={`${url}`} >
          {TranslateString(698, 'Active')}
        </ButtonItemStyle>
        <ButtonItemStyle as={Link} to={`${url}/history`}>
          {TranslateString(700, 'Inactive')}
        </ButtonItemStyle>
      </ButtonMenu>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  ${Text} {
    margin-left: 13px;
    font-size: 16px;
    line-height: 143%;
    letter-spacing: -0.03em;
    @media (max-width: 968px) {
      font-size: 13px;
    }
  }
`
const ButtonItemStyle = styled(ButtonMenuItem)`
  padding: 20px;
  border-radius: 50px;
  background-color: ${({ isActive }) => (isActive ? baseColors.primary : '')};
  color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? '#5ba7ec' : checkDarkBg(theme))}!important;
  }
  width:135px;
  @media (max-width: 968px) {
    width:100px;
    font-size: 13px;
  }
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`


