import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from 'uikit-sotatek'
import { darkColors, lightColors } from '../../../style/Color'

interface HeadingProps {
  valueToDisplay?: string
  children?: string
  Icon?: React.ComponentType
}
const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`
const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, Icon, ...props }) => {
  return (
    <Flex {...props}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <Flex flexDirection="column">
        <TextStyle fontSize="14px">{children}</TextStyle>
        <HeadingStyle>{valueToDisplay}</HeadingStyle>
      </Flex>
    </Flex>
  )
}
LotteryCardHeading.defaultProps = {
  valueToDisplay: '',
  Icon: () => <div />,
  children: '',
}
export default LotteryCardHeading