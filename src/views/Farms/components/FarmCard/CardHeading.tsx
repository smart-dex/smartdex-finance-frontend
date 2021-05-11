import React from 'react'
import styled from 'styled-components'
import { Tag, Flex } from 'smartdex-uikit'
import { lightColors, darkColors } from 'style/Color'
import { CommunityTag, CoreTag } from 'components/Tags'
import ReactTooltip from 'react-tooltip'

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
  min-width: 140px;
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

const StyleNameFarm = styled(Flex)`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: block;
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
      opacity: 1;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    }
  }
 
`
// const StyledTooltip = styled.div`
//   position: absolute;
//   top: -50px;
//   left: 0px;
//   opacity: 0;
//   z-index: 99;
//   color: ${({ theme }) => (theme.isDark ? '#E5E5E5 ' : '#000000')};
//   width: calc( 100% + 20px);
//   display: block;
//   font-size: 15px;
//   padding: 5px 10px;
//   border-radius: 3px;
//   text-align: center;
//   background: ${({ theme }) => (theme.isDark ? 'rgba(51,51,51,0.9) ' : '#FFF')};
//   border: 1px solid  ${({ theme }) => (theme.isDark ? 'transparent' : '#E5E5E5')} ;
//   -webkit-transition: all .2s ease-in-out;
//   -moz-transition: all .2s ease-in-out;
//   -o-transition: all .2s ease-in-out;
//   -ms-transition: all .2s ease-in-out;
//   transition: all .2s ease-in-out;
//   -webkit-transform: scale(0);
//   -moz-transform: scale(0);
//   -o-transform: scale(0);
//   -ms-transform: scale(0);
//   transform: scale(0);
//   &:before {
//     content: '';
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     border-top: 10px solid ${({ theme }) => (theme.isDark ? 'rgba(51,51,51,0.9) ' : '#FFF')};
//     position: absolute;
//     bottom: -10px;
//     left: 43%;

//   }
//   &:affter {
//     content: '';
//     border: 1px solid  ${({ theme }) => (theme.isDark ? 'transparent' : '#E5E5E5')} ;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     border-top: 10px solid  ${({ theme }) => (theme.isDark ? 'rgba(51,51,51,0.9) ' : '#FFF')};
//     position: absolute;
//     bottom: -10px;
//     left: 43%;

//   }
  
// `
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
      <ReactTooltip id="title" place="top" type="info" effect="float" />
      <NamePool>
        <CardTitle>
          <StyleNameFarm data-for="title" data-tip={lpLabel}>
            {lpLabel}
          </StyleNameFarm>
          <StyledTriangle />
        </CardTitle>
        <StyledTag>
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          {/* <MultiplierTag>{multiplier}</MultiplierTag> */}
        </StyledTag>
      </NamePool>
    </Flex >
  )
}

export default CardHeading
