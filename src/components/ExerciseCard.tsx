import { HStack, Heading, Image, Text, VStack, Icon } from "native-base"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { Entypo } from '@expo/vector-icons'

type ExerciseCardProps = TouchableOpacityProps & {

}

export const ExerciseCard = ({ ...rest }: ExerciseCardProps) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg={"gray.500"} alignItems={"center"} p={2} pr={4} rounded={"md"} mb={3}>
        <Image
          source={{ uri: 'https://www.dicasdeacademia.com.br/wp-content/uploads/2023/06/Remada-Alta-Polia-O-melhor-treino-para-hipertrofia-do-trapezio.webp' }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"}>
            Remada Alta
          </Heading>

          <Text fontSize={"sm"} color={"gray.200"} mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color={"gray.300"}
        />
      </HStack>
    </TouchableOpacity>
  )
}
