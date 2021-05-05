import React from 'react'
import { darkColors, lightColors, baseColors, brandColors } from 'style/Color'
import styled from 'styled-components'
import { Heading, Text } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'

const CotnetStyle = styled.div`
  margin-top: 9px;
  text-align: center;
`
const HeadingStyle = styled(Heading)`
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: ${baseColors.primary};
  margin-bottom: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
    line-height: 29px;
  }
`
const TextStyle = styled(Text)`
  font-size: 13px;
  line-height: 16px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    line-height: 17px;
  }
`
const UnlockButtonStyle = styled(UnlockButton)`
    background: ${baseColors.primary};
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    border-radius: 10px;
    min-width; 137px;
    height: 45px;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: ${brandColors.white};
    ${({ theme }) => theme.mediaQueries.nav} {
      min-width; 143px;
      height: 56px;
      font-size: 16px;
      line-height: 20px;
    }
`
const WalletNotConnected = () => {
  const TranslateString = useI18n()

  return (
    <CotnetStyle>
      <HeadingStyle size="xl">
        {TranslateString(852, 'Oops!')}
      </HeadingStyle>
      <TextStyle>
        {TranslateString(3024, 'Please connect your wallet to continue')}
      </TextStyle>
      <UnlockButtonStyle />
    </CotnetStyle>
  )
}

export default WalletNotConnected
