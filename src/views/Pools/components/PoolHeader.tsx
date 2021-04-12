import styled from 'styled-components'

const PoolHeader = styled.div`
  text-align: center;
  max-width: 500px;
  margin: 0 auto 32px auto;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding: 0 16px 0 16px;
    margin: 0 auto 40px auto;
  }
`
export default PoolHeader
