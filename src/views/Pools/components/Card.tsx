import { darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  flex-direction: column;
  // margin-bottom: 28px;
  max-width: 400px;
  min-width: 300px;
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 400px;
    margin-right: 42px;
  }
`

export default Card
