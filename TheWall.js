import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const TheWall = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Função para fazer a requisição para sua API
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('https://cc7f-187-19-163-88.ngrok-free.app/recommendations');
        if (!response.ok) {
          throw new Error('Falha ao buscar recomendações');
        }
        const data = await response.json();
        // Atualizando o estado das recomendações diretamente com os dados
        setRecommendations(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Chamando a função para buscar as recomendações ao montar o componente
    fetchRecommendations();
  }, []);

  // Renderiza cada item da lista
  const renderItem = ({ item }) => {
    const { usuario, titulo, descricao, img } = item;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: img }} style={styles.image} />
        </View>
        
        <Text style={styles.albumTitle}>{`${usuario} - ${titulo}`}</Text>
        <Text style={styles.description}>{descricao}</Text>

        <View style={styles.iconsContainer}>
          {/* Adicione os TouchableOpacity components para os ícones aqui */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>RecomendeMe - Música</Text>
      </View>

      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  flatList: {
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
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
});

export default TheWall;