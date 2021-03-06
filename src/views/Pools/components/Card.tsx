import { darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : '')};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  flex-direction: column;
  min-height:413px;
  max-width: 350px;
  min-width: 300px;
  margin-right: 12px;
  margin-left: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 400px;
    margin-right: 42px;
    margin-left: 42px;
  }
`

export default Card
