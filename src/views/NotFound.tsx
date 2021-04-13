import React from 'react'
import { lightColors, darkColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Button, Heading } from 'uikit-sotatek'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px);
  justify-content: center;
`
const StyledHeading = styled(Heading)`
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: -0.04em;
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
`
const StyledButton = styled.div`
   >a {
    background: ${baseColors.primary};
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    font-weight: 600;
    line-height: 20px;
    min-width: 143px;
    color: #FFFFFF;
    margin-top: 57px;
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
   }
   
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        <img src="/images/icon-notfound.png" alt=""/>
        <StyledHeading size="xxl">404</StyledHeading>
        <StyledButton>
          <Button as="a" href="/" size="sm">
            {TranslateString(1124, 'Back Home')}
          </Button>
        </StyledButton>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
