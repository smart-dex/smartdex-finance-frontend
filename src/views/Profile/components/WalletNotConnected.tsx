import React from 'react'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'

const WalletNotConnected = () => {
  const TranslateString = useI18n()

  return (
    <StyledBlock>
      <StyledHeading>
        {TranslateString(852, 'Oops!')}
      </StyledHeading>
      <StyledText as="p" mb="16px">
        {TranslateString(999, 'Please connect your wallet to continue')}
      </StyledText>
      <UnlockButton />
    </StyledBlock>
  )
}
const StyledBlock = styled.div`
text-align: center; 
`
const StyledHeading = styled(Heading)`
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: #0085FF;
  margin-bottom:12px;
`

const StyledText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 17px;
color:  ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
`

export default WalletNotConnected
