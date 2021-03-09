import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'

const Title = styled(Heading).attrs({ size: 'lg' })`
  color: #5f5e76;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
    line-height: 29px;
  }
`

export default Title
