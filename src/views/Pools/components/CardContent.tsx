import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => <StyledCardContent>{children}</StyledCardContent>

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 968px) {
    flex-wrap: wrap;
  }
  align-items:center;
`

export default CardContent
