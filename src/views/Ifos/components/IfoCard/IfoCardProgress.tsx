import React from 'react'
import styled from 'styled-components'
import { Progress } from '@pancakeswap-libs/uikit'

interface IfoCardProgressProps {
  progress: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
  & > div > div {
    background: #0085ff;
  }
`

const IfoCardProgress: React.FC<IfoCardProgressProps> = ({ progress }) => {
  return (
    <StyledProgress>
      <Progress primaryStep={progress} />
    </StyledProgress>
  )
}

export default IfoCardProgress
