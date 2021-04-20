import useI18n from 'hooks/useI18n'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { baseColors, lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'
import { Flex, Text, ButtonMenu, ButtonMenuItem } from 'uikit-sotatek'

interface MenuProps {
  activeIndex?: number
}
const checkDarkBg = (theme) => (theme.isDark ? '#E9F4F' : '#E9F4FC')
const Menu: React.FC<MenuProps> = ({ activeIndex = 0 }) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledMenu>
        <StyledBack>
          <RouterLink to="/teams">
            <FlexBack alignItems="center">
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13L2 7L8 1"  strokeWidth="2"/>
                </svg>

              <StyledTextBack>{TranslateString(1038, 'Teams Overview')}</StyledTextBack>
            </FlexBack>
          </RouterLink>
        </StyledBack>

        <StyledButton>
          <ButtonMenu activeIndex={activeIndex} variant="primary" scale="md">
            <ButtonItemStyle as={RouterLink} to="/tasks">
              {TranslateString(1090, 'Task Center')}
            </ButtonItemStyle>
            <ButtonItemStyle as={RouterLink} to="/profile">
              {TranslateString(1104, 'Public Profile')}
            </ButtonItemStyle>
          </ButtonMenu>
        </StyledButton>
        <SpaceDiv />
      </StyledMenu>
    </>
  )
}
const StyledMenu = styled(Flex)`
  flex-wrap: wrap;
  margin-bottom: 63px;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-wrap: nowrap;
    flex: 100%;
    margin-bottom: 63px;
  }
`

const StyledTextBack = styled(Text)`
  font-weight: 600;
  line-height: 20px;
  color: ${lightColors.colorBlue};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    color: ${lightColors.primary};
  }
`
const FlexBack = styled(Flex)`
  & svg {
    stroke: ${lightColors.colorBlue};
    width: 9px;
    margin-right: 15px;
    }
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    & svg {
      width: 12px;
      stroke: ${lightColors.primary};
      }
    }
`

const StyledButton = styled(Flex)`
  justify-content: center;
  flex: 100%;
  margin-top: 30px;
  
  & > div {
    border-radius: 50px;
    width: 260px;
    background: ${({ theme }) => (theme.isDark ? darkColors.backButtonTogger : lightColors.activeBackgroundMenuLeft)};
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 300px;
    }
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-top: 0px;
    font-size: 16px;
    flex: 33%;
  }
`
const ButtonItemStyle = styled(ButtonMenuItem)`
  padding: 20px;
  border-radius: 50px;
  width: 130px;
  font-size: 13px;
  background-color: ${({ isActive, theme }) => (isActive ? baseColors.primary : checkDarkBg(theme))};
  color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
  font-weight: 400;
  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? '#5ba7ec' : checkDarkBg(theme))}!important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 150px;
    font-size: 16px;
  }
`

const StyledBack = styled(Flex)`
  align-items: center;
  flex: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    flex: 33%;
  }
`
const SpaceDiv = styled.div`
  ${({ theme }) => theme.mediaQueries.nav} {
    flex: 33%;
  }
`
export default Menu
