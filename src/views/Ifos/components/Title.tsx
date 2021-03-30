import styled from 'styled-components'
import { lightColors } from 'style/Color'
import { Heading } from 'uikit-sotatek'

const Title = styled(Heading).attrs({ size: 'lg' })`
  color: ${lightColors.textMenuLeft};
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
    line-height: 32px;
  }
`

export default Title
