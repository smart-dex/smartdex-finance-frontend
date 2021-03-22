import styled from 'styled-components'
import { lightColors, darkColors } from 'style/Color'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow:  25px 14px 102px ${({ theme }) => (theme.isDark ? darkColors.cardShadow : lightColors.cardShadow)};
  flex-direction: column;
  position: relative;
  margin: 0px auto;
  margin-bottom: 28px;
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 400px;
  }
`

export default Card
