import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base'
import { FileInfo } from 'expo-file-system'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

const PHOTO_SIZE = 33

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/matheusmntt.png')

  const { show } = useToast()

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1
      })

      if (photoSelected.canceled) return 
      
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as FileInfo

        if (photoInfo.size && (photoInfo.size / 1024 / 1024 > 5)) {
          return show({
            title: "Essa imagem é muito grande, escolha uma de até 5MB.",
            bgColor: 'red.500'
          }) 
        } 

        setUserPhoto(photoSelected.assets[0].uri)
      }

    } catch (error) {
      throw error
    } finally {
      setPhotoIsLoading(false)
    } 
  }
  
  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading && (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={'full'}
              startColor={'gray.500'}
              endColor={'gray.400'}
            />
          )}

          {!photoIsLoading && (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          )}
          
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color={'green.500'} fontWeight={'bold'} fontSize={'md'} mt={2} mb={8}>Alterar foto</Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg={'gray.600'}
          />

          <Input
            placeholder='E-mail'
            bg={'gray.600'}
            isDisabled
          />
        </Center>
        
        <VStack px={10} mt={12} mb={9}>
          <Heading color={'gray.200'} fontSize={'md'} mb={2}>
            Alterar senha
          </Heading>

          <Input
            placeholder='Senha antiga'
            bg={'gray.600'}
            secureTextEntry
          />

          <Input
            placeholder='Nova senha'
            bg={'gray.600'}
            secureTextEntry
          /> 

          <Input
            placeholder='Confirme a nova senha'
            bg={'gray.600'}
            secureTextEntry
          />

          <Button title='Atualizar' mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
