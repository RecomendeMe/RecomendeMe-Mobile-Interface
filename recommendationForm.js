import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RecommendationForm = ({ apiEndpoint }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmission = async () => {
    try {
      const userData = {
        titulo: title,
        usuario: username,
        descricao: description,
      };

      const response = await fetch('https://90b3-187-19-163-88.ngrok-free.app/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar os dados');
      }

      setTitle('');
      setUsername('');
      setDescription('');

      // Aqui você pode adicionar a lógica de redirecionamento para a página de recomendações
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Recomendação:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Enviar" onPress={handleSubmission} />

      {/* Botão para redirecionar para outra página */}
      <Button title="Ver Recomendação" onPress={() => navigation.navigate('Last')} />

      <Button title="Ver Mural" onPress={() => navigation.navigate('Wall')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default RecommendationForm;