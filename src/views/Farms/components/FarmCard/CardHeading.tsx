import React from 'react'
import styled from 'styled-components'
import { Tag, Flex } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const CardTitle = styled.div`
  position: relative;
  height: 60px;
  width: 30%;
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  border-top: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-left: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
    width: 180px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  background: #ffa14e;
  color: #ffffff;
  border: 2px solid rgba(255, 161, 78, 0.5);
`
const NamePool = styled(Flex)`
  width:100%;
  height: 60px;
  align-self: flex-start;
`

const StyleNamePool = styled.div`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  white-space: nowrap; 
  text-overflow: ellipsis;
  overflow: hidden; 
  padding:24px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-weight: bold;
  line-height: 29px;
  font-size: 18px;
  align-self: flex-start; 
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
    width: 180px;
  }
  &:hover{
    >div{
      visibility: visible;
    }
  }
 
`
const StyledTooltip = styled.div`
  visibility: hidden;
  width: fit-content;
  top: -32px;
  background-color: black;
  color: #fffff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
    font-size: 18px;
  }
`
const StyledTriangle = styled.div`
    width: 0;
    height: 0;
    border-bottom: 60px solid ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
    border-right: 30px solid transparent;
    position: absolute;
    left: 100%;
    right: auto;
    display: block;
    height: 100%;
    top: -1px;
    &:before {
      content: "";
      content: "";
    width: 1px;
    display: block;
    background:  ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
    height:59px;
    transform: skewX(
    27deg
    );
    position: absolute;
    left: 15px;
    top: 0px;
    }
`
const StyledTag = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
  width: 70%;
  background-color:  ${({ theme }) => (theme.isDark ? '#151C31' : 'transparent')};  
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 220px;
  }
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
}) => {
  return (
    <Flex flexDirection="column">
      <NamePool>
        <CardTitle>
          <StyleNamePool>  {lpLabel}
            <StyledTooltip>  {lpLabel}
            </StyledTooltip>
          </StyleNamePool>
          <StyledTriangle />
        </CardTitle>
        <StyledTag>
          {!isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag>{multiplier}</MultiplierTag>
        </StyledTag>
      </NamePool>
    </Flex >
  )
}

export default CardHeading
