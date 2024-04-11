import { useState } from "react";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { styles } from './styles';

import { Participant }
  from "../../components/Participant";

type Props = {
  id: string,
  participant: string
}

export function Home() {
  //const [nomedoEstado,funcaoAlteraEstado] = useState()
  const [participant, setParticipant] = useState('')
  const [participants, setParticipants] = useState<Props[]>([])

  function handleAddParticipant() {

    if (participant.trim() === '') {
      return Alert.alert('Participante',
        'É obrigatorio digitar um participante')
    }

    const data = {
      id: String(new Date().getTime()),
      participant: participant.trim()
    }
    console.log(data)
    // imutabilidade
    //... spred operator
    setParticipants([...participants, data])
    setParticipant('')
  }

  function handleRemoveParticipant() {
    console.log('Você clicou no botão Remover')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 23 de Fevereiro de 2024
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor='#6B6B6B'
          value={participant}
          onChangeText={value => setParticipant(value)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant
              key={participant.id}
              name={participant.name}
              onRemove={handleRemoveParticipant}
            />
          ))
        }
      </ScrollView> */}
      <FlatList
        data={participants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Participant
            name={item.participant}
            onRemove={handleRemoveParticipant}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Adicione participante a sua lista de presença
          </Text>
        )}
      />
    </View>
  )
}