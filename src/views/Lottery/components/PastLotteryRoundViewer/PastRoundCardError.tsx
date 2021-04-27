import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit-sotatek'
import { darkColors, lightColors } from 'style/Color'
import useI18n from 'hooks/useI18n'

interface PastRoundCardErrorProps {
  error: {
    message: string
  }
}

const TextStyle = styled(Text)`
color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textMenuLeft)};
font-size: 14px;
padding: 24px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}

`
const PastRoundCardError: React.FC<PastRoundCardErrorProps> = ({ error }) => {
  const TranslateString = useI18n()
  return <TextStyle>{error.message === 'The lottery number you provided does not exist'? TranslateString(1076, 'The lottery number you provided does not exist') : error.message }</TextStyle>
}

export default PastRoundCardError
