import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking, Image, TouchableOpacity } from 'react-native';
import Icon from './assets/Dee.png';
import Icon_Spotify from './assets/Spot.png'


// Importe o ícone localizado na pasta assets


const RecommendationForm = ({ apiEndpoint }) => {
  const [latestRecommendation, setLatestRecommendation] = useState(null);

  useEffect(() => {
    fetchLatestRecommendation();
  }, []);

  const fetchLatestRecommendation = async () => {
    try {
      const response = await fetch('https://90b3-187-19-163-88.ngrok-free.app/recommendations/recommentadion');
      const data = await response.json();
      setLatestRecommendation(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirectDeezer = () => {
    if (latestRecommendation && latestRecommendation.reclink) {
      Linking.openURL(latestRecommendation.reclink)
    }
  };

  const handleRedirectSpotify = () => {
    if (latestRecommendation && latestRecommendation.reclink_spotify) {
      Linking.openURL(latestRecommendation.reclink_spotify)
    }
  };


  return (
    <View style={styles.container}>
      {latestRecommendation && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.label}>Recomendado Por: <Text style={styles.username}>{latestRecommendation.usuario}</Text></Text>
          <View style={styles.imageContainer}>
          <Image source={{ uri: latestRecommendation.img }} style={styles.image} />
        </View>
          <Text style={styles.title}>{latestRecommendation.titulo}</Text>
          
          <Text style={styles.description}>{latestRecommendation.descricao}</Text>
          {/* Use o ícone localizado na pasta assets */}



                <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleRedirectDeezer}>
                <Image source={Icon} style={styles.icon} />
              </TouchableOpacity>


              <TouchableOpacity onPress={handleRedirectSpotify}>
                <Image source={Icon_Spotify} style={styles.icon} />
              </TouchableOpacity>
            </View>
           
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    position:'relative',
    flexDirection: 'row', // Para posicionar os ícones lado a lado
    justifyContent: 'center', // Para centralizar os ícones horizontalmente
  },

  iconContainer: {

    flexDirection: 'row', // Alinha os ícones horizontalmente
    alignItems: 'center', // Centraliza os ícones verticalmente



  },
  recommendationContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white'
    
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color:'white',
  },
  username: {
    marginBottom: 5,
    color: 'white',
    textDecorationLine: 'underline',
  },
  description: {
    marginBottom: 10,
    color: 'white',
  },

  icon:{
    width: 35, // Ajuste conforme necessário
    height: 35, // Ajuste conforme necessário
    resizeMode: 'contain', // Ajuste conforme necessário
    marginRight: 25, // Espaçamento entre os ícones

  },


  Deezericon: {
    position: 'absolute',
    left: 0, // Posição horizontal do ícone Deezer
  },

  Spotifyicon: {

    position: 'absolute',
    left: 40, // Posição horizontal do ícone Spotify (ajuste conforme necessário)
   
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default RecommendationForm;
