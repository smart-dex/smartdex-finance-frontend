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
  width: 200px;
  @media (max-width: 968px) {
    margin-bottom: 16px;
  }
  margin: auto;
`
const ImageFarm = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 10px;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`
const HeadingCard = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  margin-bottom: 10px;
  front-size: 24px;
  @media (max-width: 968px) {
    front-size: 20px;
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
          <MultiplierTag variant="binance">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
