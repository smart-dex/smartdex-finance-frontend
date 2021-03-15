import { lightColors,darkColors } from 'style/Color'
import styled from 'styled-components'
import { Text } from 'uikit-sotatek'

const SecondaryCard = styled(Text)`
  border: 1px solid  ${({theme})=>(theme.isDark? darkColors.secondaryCard : lightColors.secondaryCard)};
  border-radius: 20px;
`

SecondaryCard.defaultProps = {
  p: '24px',
}

export default SecondaryCard
