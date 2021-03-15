import styled from 'styled-components'
import {lightColors,darkColors,baseColors} from 'style/Color'

const StyedCard = styled.div`
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 344px;
  min-width: 200px;
  padding:0;
  background: ${({theme})=>(theme.isDark? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  border: 1px solid  ${({theme})=>(theme.isDark? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 50px 38px 102px ${({theme})=>(theme.isDark? darkColors.shadowCardCollectibles:lightColors.shadowCardCollectibles)};
  border-radius: 40px;
  &:hover{
    border: 1px solid ${baseColors.primary};
    box-shadow: 25px 14px 102px ${lightColors.boxShadowActiveCard};
  }
`

export default StyedCard
