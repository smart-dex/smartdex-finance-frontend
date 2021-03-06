import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from 'smartdex-uikit'
import { lightColors, darkColors, baseColors } from 'style/Color'
import useI18n from 'hooks/useI18n'


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  border-radius: 50px;
  & a {
    color: ${lightColors.textMenuLeft};
    height: 45px;
    font-size: 13px;
    padding: 0 20px;

    background: none;
    line-height: 20px;
    border-radius: 50px;
    &:hover {
      background: none;
    }
    &:focus {
      box-shadow: 'none';
    }
  }
  & > div {
    background: ${({ theme }) => (theme.isDark ? darkColors.backButtonTogger : lightColors.activeBackgroundMenuLeft)};
    border-radius: 50px;
  }
  @media (min-width: 768px) {
    & a {
      height: 56px;
      padding: 0 30px;
      font-size: 16px;
    }
  }
  .active {
    background: ${baseColors.primary};
    color: ${lightColors.card};
    border-radius: 50px;
    box-shadow: 0px 4px 10px ${ baseColors.boxShadow};
    &:hover {
      opacity: 0.65;
      background: ${baseColors.primary};
    }
  }
  .not-active {
    color: ${({ theme }) => (theme.isDark ? lightColors.background : lightColors.textMenuLeft)};
    font-weight: normal;
    line-height: 20px;
  }
  .active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 1 !important;
}
`

const IfoTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} variant="subtle">
        <ButtonMenuItem className={isExact ? 'active' : 'not-active'} as={Link} to={`${url}`}>
          {TranslateString(1203, "Next IFO")}
        </ButtonMenuItem>
        <ButtonMenuItem className={!isExact ? 'active' : 'not-active'} as={Link} to={`${url}/history`}>
          {TranslateString(1205, "Past IFO")}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default IfoTabButtons
