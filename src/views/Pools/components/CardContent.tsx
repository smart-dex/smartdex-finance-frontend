import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => <StyledCardContent>{children}</StyledCardContent>

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-wrap: nowrap;
  }
`

export default CardContent
