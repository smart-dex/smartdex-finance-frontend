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
  tabName?: string
}

const StatBox: React.FC<StatBoxProps> = ({ icon: Icon, title, subtitle, isDisabled = false, urlIcon, tabName, ...props }) => {
  return (
    <SecondaryCard {...props}>
      <Flex alignItems="start" flexWrap="wrap">
        {urlIcon ? (
          <ImageBox urlIcon="urlIcon" />
        ) : (
          <>
          {
            tabName === 'ComingSoon'
            ?
            <svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.5 3.8585V0.25H7.5V3.8585H0.5V9C0.5 13.4187 3.8075 17.0465 8.067 17.631C8.67736 19.4209 9.75995 21.0127 11.2003 22.238C12.6407 23.4634 14.3854 24.2769 16.25 24.5925V26.5C16.25 27.4283 15.8813 28.3185 15.2249 28.9749C14.5685 29.6313 13.6783 30 12.75 30H11V33.5H25V30H23.25C22.3217 30 21.4315 29.6313 20.7751 28.9749C20.1187 28.3185 19.75 27.4283 19.75 26.5V24.5925C21.6144 24.2765 23.359 23.4629 24.7993 22.2376C26.2396 21.0123 27.3223 19.4207 27.933 17.631C32.1925 17.0465 35.5 13.4187 35.5 9V3.8585H28.5ZM4 9V7.3585H7.5V13.949C6.47711 13.5863 5.59155 12.9158 4.96489 12.0297C4.33823 11.1436 4.00118 10.0853 4 9ZM32 9C31.9985 10.0857 31.6614 11.1443 31.0348 12.0309C30.4083 12.9175 29.5229 13.5887 28.5 13.9525V7.355H32V9Z" fill="#6C6B81"/>
              </svg>
            
            :
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M15.8126 27.125C15.8126 27.125 13.6251 27.125 13.6251 24.9375C13.6251 22.75 15.8126 16.1875 24.5626 16.1875C33.3126 16.1875 35.5001 22.75 35.5001 24.9375C35.5001 27.125 33.3126 27.125 33.3126 27.125H15.8126ZM24.5626 14C26.3031 14 27.9723 13.3086 29.203 12.0779C30.4337 10.8472 31.1251 9.17798 31.1251 7.4375C31.1251 5.69702 30.4337 4.02782 29.203 2.79711C27.9723 1.5664 26.3031 0.875 24.5626 0.875C22.8221 0.875 21.1529 1.5664 19.9222 2.79711C18.6915 4.02782 18.0001 5.69702 18.0001 7.4375C18.0001 9.17798 18.6915 10.8472 19.9222 12.0779C21.1529 13.3086 22.8221 14 24.5626 14ZM11.9101 27.125C11.5858 26.4421 11.4241 25.6934 11.4376 24.9375C11.4376 21.9734 12.9251 18.9219 15.6726 16.8C14.3013 16.3775 12.8725 16.1708 11.4376 16.1875C2.68762 16.1875 0.500122 22.75 0.500122 24.9375C0.500122 27.125 2.68762 27.125 2.68762 27.125H11.9101ZM10.3439 14C11.7943 14 13.1853 13.4238 14.2109 12.3982C15.2365 11.3727 15.8126 9.98165 15.8126 8.53125C15.8126 7.08085 15.2365 5.68985 14.2109 4.66426C13.1853 3.63867 11.7943 3.0625 10.3439 3.0625C8.89347 3.0625 7.50247 3.63867 6.47688 4.66426C5.45129 5.68985 4.87512 7.08085 4.87512 8.53125C4.87512 9.98165 5.45129 11.3727 6.47688 12.3982C7.50247 13.4238 8.89347 14 10.3439 14Z" fill="#6C6B81"/>
            </svg>
              
          }
          </>
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
