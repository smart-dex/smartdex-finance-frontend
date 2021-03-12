import styled from 'styled-components'
import { Heading } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'

export const FarmHeader = styled.div`
  text-align: center;
  padding: 0px 16px;
  margin-bottom: 43px;
`
export const HeadingFarm = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
`
