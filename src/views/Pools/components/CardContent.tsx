import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => <StyledCardContent>{children}</StyledCardContent>

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  @media (max-width: 967px) {
    flex-wrap: wrap;
  }
  align-items:center;
`

export default CardContent
