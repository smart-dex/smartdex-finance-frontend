import React from 'react'
import styled from 'styled-components'

interface Props {
  hasBalance?: boolean
}

const Title = styled.div`
  color: #ed4b9e;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
`

const ActionLink = styled.a`
  color: #ed4b9e;
  font-size: 14px;
`

const OldSyrupTitle: React.FC<Props> = ({ hasBalance = false }) => {
  if (hasBalance) {
    return (
      <div style={{ marginTop: '16px' }}>
        <Title>Action Required</Title>
        <ActionLink
          href={`${process.env.REACT_APP_PANCAKE_MEDIUM}`}
          target="_blank"
        >
          What do I need to do?
        </ActionLink>
      </div>
    )
  }

  return (
    <div>
      <Title>FINISHED</Title>
    </div>
  )
}

export default OldSyrupTitle
