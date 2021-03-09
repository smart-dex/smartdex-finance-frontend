import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import { SelectButtonStyle } from 'style/Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  justify-content: flex-start;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 39px;
  }
  ${SelectButtonStyle}
`

const IfoTabButtons = () => {
  const { url, isExact } = useRouteMatch()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} size="md" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Next IFO
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          Past IFOs
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default IfoTabButtons
