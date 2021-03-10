import styled from 'styled-components'
import { Heading } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'

export const FarmHeader = styled.div`
  text-align: center;
`
export const HeadingFarm = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
`

