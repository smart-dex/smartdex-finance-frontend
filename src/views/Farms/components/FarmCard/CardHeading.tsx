import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  flex-grow: 1;
  svg {
    margin-right: 0.25rem;
  }
  margin-bottom: 16px;
  min-width: 200px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 200px;
    margin-bottom: 0px;
  }
  align-items: center;
`
const ImageFarm = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 10px;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  background: #ffa14e;
  color: #ffffff;
  border: 2px solid rgba(255, 161, 78, 0.5);
`
const HeadingCard = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  margin-bottom: 10px;
  font-weight: bold;
  line-height: 29px;
  front-size: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    front-size: 24px;
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
}) => {
  return (
    <Wrapper>
      <ImageFarm>
        <img src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} style={{ width: '100%', height: '100%' }} />
      </ImageFarm>
      <Flex flexDirection="column">
        <HeadingCard>{lpLabel}</HeadingCard>
        <Flex>
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag>{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
