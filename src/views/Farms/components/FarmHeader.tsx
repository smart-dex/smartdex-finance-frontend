import styled from 'styled-components'
import { Heading } from 'smartdex-uikit'
import { lightColors, darkColors } from 'style/Color'

export const FarmHeader = styled.div`
  text-align: center;
  margin-bottom: 43px;
`
export const HeadingFarm = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
`
