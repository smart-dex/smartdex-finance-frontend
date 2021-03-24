import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 18px;
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`

export default CardTitle
