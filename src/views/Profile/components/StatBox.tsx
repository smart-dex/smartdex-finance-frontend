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
      <Flex alignItems="start" flexWrap="wrap">
        {urlIcon ? (
          <ImageBox urlIcon="urlIcon" />
        ) : (
          
          <svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.5 3.8585V0.25H7.5V3.8585H0.5V9C0.5 13.4187 3.8075 17.0465 8.067 17.631C8.67736 19.4209 9.75995 21.0127 11.2003 22.238C12.6407 23.4634 14.3854 24.2769 16.25 24.5925V26.5C16.25 27.4283 15.8813 28.3185 15.2249 28.9749C14.5685 29.6313 13.6783 30 12.75 30H11V33.5H25V30H23.25C22.3217 30 21.4315 29.6313 20.7751 28.9749C20.1187 28.3185 19.75 27.4283 19.75 26.5V24.5925C21.6144 24.2765 23.359 23.4629 24.7993 22.2376C26.2396 21.0123 27.3223 19.4207 27.933 17.631C32.1925 17.0465 35.5 13.4187 35.5 9V3.8585H28.5ZM4 9V7.3585H7.5V13.949C6.47711 13.5863 5.59155 12.9158 4.96489 12.0297C4.33823 11.1436 4.00118 10.0853 4 9ZM32 9C31.9985 10.0857 31.6614 11.1443 31.0348 12.0309C30.4083 12.9175 29.5229 13.5887 28.5 13.9525V7.355H32V9Z" fill="#6C6B81"/>
          </svg>
        )}
        <div>
          <TextHeading isDisabled={isDisabled}>{title}</TextHeading>
          <TextSubHeading isDisabled={isDisabled}>{subtitle}</TextSubHeading>
        </div>
      </Flex>
    </SecondaryCard>
  )
}
const TextHeading = styled(Heading)<{ isDisabled: boolean }>`
  font-weight: 600;
  line-height: 44px;
  font-size: 36px;
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

const TextSubHeading = styled(Text)<{ isDisabled: boolean }>`
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
  margin-right: 24px;
  content: url('${(props) => props.urlIcon}');
`

export default StatBox
