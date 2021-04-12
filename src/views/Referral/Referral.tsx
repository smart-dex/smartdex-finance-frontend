import React, { useState, useEffect } from 'react'
import Page from 'components/layout/Page'
import styled from 'styled-components'

const ButtonStyled = styled.button`
`
const DivStyled = styled.div`
`


const Referral: React.FC = () => {
  
  return (
    <DivStyled>
      <Page>
        <img src="/images/pan-cake.png" alt=""/>
      </Page>
    </DivStyled>
  )
}

export default Referral
