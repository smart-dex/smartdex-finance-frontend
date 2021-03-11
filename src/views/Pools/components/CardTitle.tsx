import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 18px;
  @media (max-width: 968px) {
    font-size: 20px;
  }
`

export default CardTitle
