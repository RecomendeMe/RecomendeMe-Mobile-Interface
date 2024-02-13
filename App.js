import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const App = () => {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // Função para fazer a requisição para sua API
    const fetchRecommendation = async () => {
      try {
        const response = await fetch('NGORK_SERVER_DOMAIN', {
          headers: {
            // Adicione os cabeçalhos desejados aqui
            'Content-Type': 'application/json',
            // Outros cabeçalhos, se necessário
          },
        });
        
        if (!response.ok) {
          throw new Error('Falha ao buscar recomendação');
        }
        
        const data = await response.json();
        // Atualizando o estado da recomendação diretamente com os dados
        setRecommendation(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Chamando a função para buscar a recomendação ao montar o componente
    fetchRecommendation();
  }, []);
  // Verifica se ainda não carregou a recomendação
  if (!recommendation) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  // Extrai os dados da recomendação
  const { usuario, titulo, descricao, img } = recommendation;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>紹介してください</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: img }} style={styles.image} />
        </View>
        
        <Text style={styles.albumTitle}>{`${usuario} - ${titulo}`}</Text>
        <Text style={styles.description}>{descricao}</Text>

        <View style={styles.iconsContainer}>
          {/* Adicione os TouchableOpacity components para os ícones aqui */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8c0000',
  },
  header: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  albumTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
