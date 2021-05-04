import React from 'react'
import styled from 'styled-components'

interface Props {
  tokenName: string
  stakingTokenName: string
}



const ImagePool: React.FC<Props> = ({ stakingTokenName, tokenName }) => {


  return (
    <StyledImage>
      <img src="/images/tokens/CAKE.png" alt=""/>
      <IconDirect src="/images/tokens/CAKE.png" alt="" />
  </ StyledImage>
  )
}
const StyledImage = styled.div`
    margin-top: 25px;
    width: 60px;
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 60px;
    }
    position: relative;

    border-radius: 15px;

`
const IconDirect = styled.img`
width: 26px;
  height: 26px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 28px;
    height: 28px;
  }
  z-index: 1;
  position: absolute;
  right: -10px;
  bottom:0;
  border: 2px solid ${({ theme }) => (theme.isDark ? "" : "#FFF")};
  border-radius: 15px;

`
export default ImagePool
