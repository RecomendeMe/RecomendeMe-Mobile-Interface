import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para fazer a requisição para sua API
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('GORK_SERVER_DOMAIN', {
          headers: {
            // Adicione os cabeçalhos desejados aqui
            'Content-Type': 'application/json',
            // Outros cabeçalhos, se necessário
          },
        });
        
        if (!response.ok) {
          throw new Error('Falha ao buscar recomendações');
        }
        
        const data = await response.json();
        // Verifica se há recomendações na lista
        if (Array.isArray(data)) {
          setRecommendations(data);
        } else {
          throw new Error('Nenhuma recomendação encontrada');
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message || 'Erro ao carregar recomendações');
        setIsLoading(false);
      }
    };
  
    // Chamando a função para buscar as recomendações ao montar o componente
    fetchRecommendations();
  }, []);

  // Verifica se ainda não carregou as recomendações ou se houve um erro
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Verifica se há recomendações disponíveis
  if (!recommendations || recommendations.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhuma recomendação encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>紹介してください</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {recommendations.map((recommendation, index) => (
          <View key={index} style={styles.recommendationContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: recommendation.img }} style={styles.image} />
            </View>
            <Text style={styles.albumTitle}>{`${recommendation.usuario} - ${recommendation.titulo}`}</Text>
            <Text style={styles.description}>{recommendation.descricao}</Text>
            {/* Adicione os TouchableOpacity components para os ícones aqui */}
          </View>
        ))}
      </ScrollView>
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
  scrollViewContent: {
    paddingVertical: 20,
  },
  recommendationContainer: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#3b3b3b',
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
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;