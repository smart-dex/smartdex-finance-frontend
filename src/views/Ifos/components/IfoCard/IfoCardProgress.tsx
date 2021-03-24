import React from 'react'
import styled from 'styled-components'
import { baseColors } from 'style/Color'
import { Progress } from 'uikit-sotatek'

interface IfoCardProgressProps {
  progress: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
  & > div > div {
    background: ${baseColors.primary};
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
