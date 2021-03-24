import React from 'react'
import styled from 'styled-components'
import { lightColors, darkColors } from 'style/Color'
import { Heading } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import NftList from './components/NftList'

const StyledHero = styled(Heading)`
  margin-bottom: 12px;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
`

const Collectibles = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledHero as="h1" size="xxl" color="secondary">
        {TranslateString(999, 'Pancake Collectibles')}
      </StyledHero>
      <NftList />
    </Page>
  )
}

export default Collectibles
