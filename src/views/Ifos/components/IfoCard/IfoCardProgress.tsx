import React from 'react'
import styled from 'styled-components'
import { baseColors } from 'style/Color'
import { Progress } from 'uikit-sotatek'

interface IfoCardProgressProps {
  progress: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
  justify-content: flex-end;
  & > div > div {
    background: ${baseColors.primary};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 35%;
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
