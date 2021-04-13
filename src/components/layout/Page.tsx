import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
  min-height: calc(100vh - 94px);
  padding: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 32px 40px;
  }
`

export default Page
