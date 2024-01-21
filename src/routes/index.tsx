import { Box, useTheme } from 'native-base'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import React from 'react'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export const Routes = () => {
  const { colors: { gray } } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = gray[700]
  return (
    <Box flex={1} bg={'gray.700'}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
