import React from 'react'
import styled from 'styled-components'
import { lightColors, baseColors, darkColors } from 'style/Color'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'

const FarmTabButtons = ({ stackedOnly, setStackedOnly, active, setActive }) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <StyledToggle isActive={stackedOnly}>
          <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
        </StyledToggle>

        <StyledText> {TranslateString(1116, 'Staked Only')}</StyledText>
      </ToggleWrapper>
      <ButtonMenuStyle>
        <ButtonMenu activeIndex={active ? 0 : 1} onItemClick={() => setActive(!active)} scale="md">
          <ButtonItemStyle >
            {TranslateString(698, 'Active')}
          </ButtonItemStyle>
          <ButtonItemStyle>
            {TranslateString(700, 'Inactive')}
          </ButtonItemStyle>
        </ButtonMenu>
      </ButtonMenuStyle>
    </Wrapper>
  )
}

export default FarmTabButtons
const StyledToggle = styled.div <{ isActive: boolean }>`
  >div{
    background-color: ${({ isActive }) => (isActive ? "rgb(111 207 151 / 20%)" : "#E5E5E5")};
    background: ${({ theme, isActive }) => (theme.isDark && !isActive && "rgb(53, 53, 71)")};
    >div{
      background-color: ${({ isActive }) => (isActive ? "#17C267" : "#FFFF")};
    }
  }
`
const StyledText = styled(Text)`
font-style: normal;
font-weight: normal;
font-size: 13px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}
line-height: 143%;
letter-spacing: -0.03em;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-right: 32px;
  }
  
  ${Text} {
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
    margin-left: 13px;
    font-size: 13px;
    line-height: 143%;
    letter-spacing: -0.03em;
    word-break: keep-all;
    font-size: 13px;
    color: ${({ theme }) => (theme.isDark ? darkColors.stakedOnly : lightColors.stakedOnly)};
    align-self: baseline;
  }
`
const ButtonItemStyle = styled(ButtonMenuItem)`
  word-break: keep-all;
  border-radius: 50px;
  background-color: ${({ isActive }) => (isActive ? baseColors.primary : '')};
  color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
  &:hover{
    opacity: 1 !important; 
  }
`
const ButtonMenuStyle = styled.div`
  & > div {
    margin-bottom: 16px;
    border-radius: 50px;
  }
`
