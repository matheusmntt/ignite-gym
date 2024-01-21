import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, ScrollView } from 'native-base' 

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

import { Input } from '@components/Input'
import { Platform } from 'react-native'
import { Button } from '@components/Button'

export const SignIn = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const handleNewAccount = () => {
    navigate('signUp')
  }

  return (   
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={Platform.OS === 'ios' ? 16 : 16}>
        <Image
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Pessoas treinando"
          resizeMode='contain'
          position={'absolute'}
        />
        

          <Center my={24}>
            <LogoSvg />

            <Text color={'gray.100'} fontSize={'sm'}>Treine a sua mente e o seu corpo</Text>
          </Center> 
          
          <Center>
            <Text color="gray.100" fontSize={'2xl'} mb={6} fontFamily={'heading'}>
              Acesse sua conta
            </Text>

            <Input
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input
              placeholder='Senha'
              secureTextEntry
            />

            <Button title='Acessar' />
          </Center>
          
          <Center mt={16}>
            <Text
              color={'gray.100'}
              fontSize={'sm'}
              mb={3}
              fontFamily={'body'}
            >
              Ainda não tem acesso?
            </Text>

          <Button
            title='Criar conta'
            variant={'outline'}
            onPress={handleNewAccount}
          />
          </Center>
      </VStack>  
    </ScrollView>
  )
}
