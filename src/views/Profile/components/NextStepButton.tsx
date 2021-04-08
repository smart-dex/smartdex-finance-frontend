import React from 'react'
import styled from 'styled-components'
import { ArrowForwardIcon, Button, ButtonProps } from 'uikit-sotatek'



const NextStepButton: React.FC<ButtonProps> = (props) => {
  return <Button endIcon={<ArrowForwardIcon color="currentColor" />} {...props} />
}


export default NextStepButton
