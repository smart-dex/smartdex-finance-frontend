import styled from 'styled-components'
import { lightColors, darkColors, baseColors } from 'style/Color'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${(props) => props.theme.card.background};
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 50px 38px 102px ${({ theme }) => (theme.isDark ? darkColors.cardShadow : lightColors.cardShadow)};
  border-radius: 20px;
  flex-direction: column;
  &:hover {
    border: 1px solid ${baseColors.primary};
    transition: 0.25s;
  }
  position: relative;
  margin: 0px auto;
  margin-bottom: 28px;
  min-width: 968px;
  @media (max-width: 968px) {
    max-width: 400px;
    min-width: 0;
  }
`

export default Card
