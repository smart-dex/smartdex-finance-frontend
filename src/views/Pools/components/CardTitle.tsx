import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  background: ${({ isFinished }) => isFinished ? '#17C267' : ''};
  position: relative;
  height: 60px;
  width: 150px;
  border-top: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-left: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
    width: 200px;
  }
`

export default CardTitle
