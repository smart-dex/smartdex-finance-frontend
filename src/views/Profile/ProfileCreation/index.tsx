import React from 'react'
import Header from './Header'
import ProfileCreationProvider from './contexts/ProfileCreationProvider'
import Steps from './Steps'

const ProfileCreation = () => (
  <ProfileCreationProvider>
    <Header />
    <Steps />
  </ProfileCreationProvider>
)

export default ProfileCreation
