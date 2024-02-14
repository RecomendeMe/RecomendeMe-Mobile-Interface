import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import Icon from './assets/Dee.png';
import Icon_Spotify from './assets/Spot.png'


const TheWall = () => {
  const [recommendations, setRecommendations] = useState([]);


  


  useEffect(() => {
    // Função para fazer a requisição para sua API
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('https://90b3-187-19-163-88.ngrok-free.app/recommendations');
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
    const { usuario, titulo, descricao, img, reclink, reclink_spotify } = item;

    const handleRedirectDeezer = () => {
      if (item && reclink) {
        Linking.openURL(reclink)
      }
    };
  
    const handleRedirectSpotify = () => {
      if (item && reclink_spotify) {
        Linking.openURL(reclink_spotify)
      }
    };
  

    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: img }} style={styles.image} />
        </View>
        
        <Text style={styles.albumTitle}>{`${usuario} - ${titulo}`}</Text>
        <Text style={styles.description}>{descricao}</Text>

        <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleRedirectDeezer}>
                <Image source={Icon} style={styles.icon} />
              </TouchableOpacity>

              
              <TouchableOpacity onPress={handleRedirectSpotify}>
                <Image source={Icon_Spotify} style={styles.icon} />
              </TouchableOpacity>
            </View>

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


  iconContainer: {

    flexDirection: 'row', // Alinha os ícones horizontalmente
    alignItems: 'center', // Centraliza os ícones verticalmente
    paddingHorizontal: 130,




  },

  icon:{
    width: 35, // Ajuste conforme necessário
    height: 35, // Ajuste conforme necessário
    resizeMode: 'contain', // Ajuste conforme necessário
    marginRight: 35, // Espaçamento entre os ícones

  },


  Deezericon: {
    position: 'absolute',
    left: 0, // Posição horizontal do ícone Deezer
  },

  Spotifyicon: {

    position: 'absolute',
    left: 40, // Posição horizontal do ícone Spotify (ajuste conforme necessário)
   
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