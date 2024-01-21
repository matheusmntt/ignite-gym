import { Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, ScrollView } from 'native-base' 

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve conter 6 caracteres.'), 
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem ser iguais')
})

type FormDataProps = yup.InferType<typeof signUpSchema>

export const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  const { goBack } = useNavigation()

  const handleGoBack = () => {
    goBack()
  }

  const handleSignUp = (data: FormDataProps) => {
    console.log(data)
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

          <Text color={'gray.100'} fontSize={'sm'}>Crie e acessar</Text>
        </Center> 
        
        <Center>
          <Text color="gray.100" fontSize={'2xl'} mb={6} fontFamily={'heading'}>
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              /> 
            )}
          /> 

          <Controller
            control={control}
            name='password_confirm'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirme sua senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                errorMessage={errors.password_confirm?.message}
              /> 
            )}
          /> 

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>
      
        <Button
          title='Voltar para o login'
          variant={'outline'}
          mt={8}
          onPress={handleGoBack}
        />
 
      </VStack>  
    </ScrollView>
  )
}
