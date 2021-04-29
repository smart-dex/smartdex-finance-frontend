import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from 'smartdex-uikit'
import styled from 'styled-components'
import ApyCalculatorModal from './ApyCalculatorModal'


export interface ApyButtonProps {
  lpLabel?: string
  sdcPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, sdcPrice, apy, addLiquidityUrl }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal lpLabel={lpLabel} sdcPrice={sdcPrice} apy={apy} addLiquidityUrl={addLiquidityUrl} />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm"  style={{alignItems:'baseline', height:'20px'}}>
      <StyledIcon>
      <CalculateIcon />
      </StyledIcon>

    </IconButton>
  )
}
const StyledIcon = styled.div`
>svg>path{

    fill: ${({ theme }) => (theme.isDark && '#FFFFFF')};

}
`
export default ApyButton
