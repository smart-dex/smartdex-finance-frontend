import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  flex-grow:1;
  svg {
    margin-right: 0.25rem;
  }
  width: 200px;
`
const ImageFarm = styled.div`
  width:55px;
  height:55px;
  margin-right: 10px;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
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
          <img src={`/images/farms/${farmImage}.svg`}  alt={tokenSymbol} style={{ width: "100%", height: "100%" }} />
      </ImageFarm>
      <Flex flexDirection="column">
        <Heading mb="10px" size='lg'>{lpLabel}</Heading>
        <Flex>
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
