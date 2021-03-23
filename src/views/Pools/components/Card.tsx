import styled from 'styled-components'
import { lightColors, darkColors } from 'style/Color'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  // margin-bottom: 28px;
  max-width: 400px;
  ${({ theme }) => theme.mediaQueries.nav} {
    max-width: 400px;
    margin-right: 42px;
  }
`

export default Card
