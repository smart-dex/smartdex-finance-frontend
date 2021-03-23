import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'

interface StyledTriangleProps {
    isFinished?: boolean
}

const StyledTriangle = styled.div<StyledTriangleProps>`
width: 0;
height: 0;
border-bottom: 60px solid ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
border-bottom: ${({ isFinished }) => (isFinished && '#17C267')}
border-right: 30px solid transparent;
position: absolute;
left: 100%;
right: auto;
display: block;
height: 100%;
top: 0px;
&:before {
  content: "";
  content: "";
width: 1px;
display: block;
background:  ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
background: ${({ isFinished }) => (isFinished && '#17C267')}
height:59px;
transform: skewX(
27deg
);
position: absolute;
left: 15px;
top: 0px;
}
`

export default StyledTriangle
