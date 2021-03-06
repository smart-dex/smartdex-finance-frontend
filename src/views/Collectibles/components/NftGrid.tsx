import styled from 'styled-components'

const NftGrid = styled.div`
  display: grid;
  grid-gap: 44px;
  grid-template-columns: 1fr;
  padding-bottom: 24px;
  padding-top: 24px;
  margin-bottom: 50px;
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);  
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    grid-template-columns: repeat(3, 1fr);   
  }
`

export default NftGrid
