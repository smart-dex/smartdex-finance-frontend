import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Toggle, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { baseColors, lightColors, darkColors } from 'style/Color'

const PoolTabButtons = ({ stackedOnly, setStackedOnly, finishedPool, setFinishedPool }) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <StyledToggle isActive={stackedOnly}>
          <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
        </StyledToggle>

        <StyledText> {TranslateString(999, 'Staked Only')}</StyledText>
      </ToggleWrapper>
      <ButtonMenuStyle>
        <ButtonMenu activeIndex={!finishedPool ? 0 : 1} onItemClick={() => setFinishedPool(!finishedPool)} scale="sm" >
          <ButtonItemStyle >
            {TranslateString(698, 'Active')}
          </ButtonItemStyle>
          <ButtonItemStyle  >
            {TranslateString(700, 'Inactive')}
          </ButtonItemStyle>
        </ButtonMenu>
      </ButtonMenuStyle>
    </Wrapper>
  )
}

export default PoolTabButtons
const StyledText = styled(Text)`
font-style: normal;
font-weight: normal;
font-size: 13px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}
line-height: 143%;
letter-spacing: -0.03em;
align-self: baseline;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-right: 10px;
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
    font-size: 13px;
    color: ${({ theme }) => (theme.isDark ? darkColors.stakedOnly : lightColors.stakedOnly)};
    align-self: baseline;
  }
`
const ButtonItemStyle = styled(ButtonMenuItem)`
padding: 20px;
border-radius: 50px;
background-color: ${({ isActive }) => (isActive ? baseColors.primary : '')};
color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
min-width: 75px;
font-size: 13px;
line-height: 20px;
font-weight: 400;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
  min-width: 100px;
}
`
const ButtonMenuStyle = styled.div`
  margin-bottom: 16px;
  margin-bottom: 16px;
  & > div {
     ${({ theme }) => theme.mediaQueries.nav} {
      width: 200px;
     }
    width: 150px;
    border-radius: 50px;
  }
`
const StyledToggle = styled.div <{ isActive: boolean }>`
  >div{
    background-color: ${({ isActive }) => (isActive ? "rgb(111 207 151 / 20%)" : "#E5E5E5")};
    background: ${({ theme, isActive }) => (theme.isDark && !isActive && "rgb(53, 53, 71)")};
    >div{
      background-color: ${({ isActive }) => (isActive ? "#17C267" : "#FFFF")};
    }
  }
`
