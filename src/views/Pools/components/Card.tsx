import styled from 'styled-components'
import { lightColors, darkColors, baseColors } from 'style/Color'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${(props) => props.theme.card.background};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-radius: 32px;
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  box-shadow: ${({ isActive }) =>
    isActive
      ? '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4);'
      : '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)'};
  flex-direction: column;
  &:hover {
    border: 1px solid ${baseColors.primary};
    transition: 0.25s;
  }
  position: relative;
  margin-bottom: 20px;
  margin: 20px auto;
  min-width: 968px;
  @media (max-width: 968px) {
    max-width: 400px;
    min-width: 0;
  }
`

export default Card
