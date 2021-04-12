import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Image } from 'uikit-sotatek'
import Page from './layout/Page'

const pulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${pulse} 800ms linear infinite;
  & > * {
    width: 72px;
  }
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Image src="/images/project.svg" width={100} height={100} alt="Your project here" />
    </Wrapper>
  )
}

export default PageLoader
