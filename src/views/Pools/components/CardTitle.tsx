import { lightColors, darkColors } from 'style/Color'
import styled, { css } from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  ${props => props.isFinished && css`
    color: ${({ theme }) => (theme.isDark ? darkColors.textDisabled : lightColors.textDisabled)};
  `}
  
  font-weight: 600;
  font-size: 24px;
  line-height: 1.1;
  margin-bottom: 14px;
`

export default CardTitle
