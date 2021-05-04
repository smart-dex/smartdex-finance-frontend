import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'
import { Text } from 'smartdex-uikit'

const SecondaryCard = styled(Text)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.secondaryCard : lightColors.secondaryCard)};
  border-radius: 20px;
  svg{
    fill: #6C6B81;
    margin: 5px 15px 10px;
  }
`

SecondaryCard.defaultProps = {
  p: '24px',
}

export default SecondaryCard
