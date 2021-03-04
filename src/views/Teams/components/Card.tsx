import styled from 'styled-components'

const StyedCard = styled.div`
  background: ${(props) => props.theme.card.background};    
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 344px;
  padding:0;
`

export default StyedCard
