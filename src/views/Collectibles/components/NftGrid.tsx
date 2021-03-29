import styled from 'styled-components'

const NftGrid = styled.div`
  display: grid;
  grid-gap: 44px;
  grid-template-columns: 1fr;
  padding-bottom: 24px;
  padding-top: 24px;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 44px;
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 44px;
  }
`

export default NftGrid
