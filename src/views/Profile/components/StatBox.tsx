import React, { ElementType, ReactNode } from 'react'
import { Flex, Heading, Text, TextProps } from 'uikit-sotatek'
import styled, { css } from 'styled-components'
import { lightColors, darkColors } from 'style/Color'
import SecondaryCard from './SecondaryCard'



interface StatBoxProps extends TextProps {
  icon?: ElementType
  title: ReactNode
  subtitle: ReactNode
  isDisabled?: boolean
  urlIcon?: string
}

const StatBox: React.FC<StatBoxProps> = ({ icon: Icon, title, subtitle, isDisabled = false, urlIcon, ...props }) => {
  return (
    <SecondaryCard {...props}>
      <Flex alignItems="start" flexWrap='wrap'>
        {urlIcon ?
          (<ImageBox urlIcon='urlIcon' />) : (<Icon width="44px" mr="24px" color={isDisabled ? 'textDisabled' : 'currentColor'} />)
        }
        <div>
          <TextHeading isDisabled={isDisabled}>
            {title}
          </TextHeading>
          <TextSubHeading isDisabled={isDisabled}>
            {subtitle}
          </TextSubHeading>
        </div>
      </Flex>
    </SecondaryCard>
  )
}
const TextHeading = styled(Heading) <{ isDisabled: boolean }>`
  font-weight: 600;
  line-height: 44px;
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
    `}
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 36px;
    }
`

const TextSubHeading = styled(Text) <{ isDisabled: boolean }>`
  font-weight: 600;
  font-size: 10px;
  line-height: 143%;
  letter-spacing: -0.03em;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
    `}
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 14px;
    }
`
const ImageBox = styled.image<{ urlIcon: string }>`
  margin-right:24px;
  content: url('${(props) => props.urlIcon}')
`

export default StatBox
