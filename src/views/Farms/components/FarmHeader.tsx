import styled from 'styled-components'
import { Heading } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'

export const FarmHeader = styled.div`
  text-align: center;
  padding: 0px 16px;
  margin-bottom: 32px;
`
export const HeadingFarm = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
`

