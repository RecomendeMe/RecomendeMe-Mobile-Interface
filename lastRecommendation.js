import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking, Image, TouchableOpacity } from 'react-native';
import Icon from './assets/deezer_f.png';


// Importe o ícone localizado na pasta assets


const RecommendationForm = ({ apiEndpoint }) => {
  const [latestRecommendation, setLatestRecommendation] = useState(null);

  useEffect(() => {
    fetchLatestRecommendation();
  }, []);

  const fetchLatestRecommendation = async () => {
    try {
      const response = await fetch('https://cc7f-187-19-163-88.ngrok-free.app/recommendations/recommendation');
      const data = await response.json();
      setLatestRecommendation(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = () => {
    if (latestRecommendation && latestRecommendation.reclink) {
      Linking.openURL(latestRecommendation.reclink);
    }
  };

  return (
    <View style={styles.container}>
      {latestRecommendation && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.label}>Última Recomendação:</Text>
          <View style={styles.imageContainer}>
          <Image source={{ uri: latestRecommendation.img }} style={styles.image} />
        </View>
          <Text style={styles.title}>{latestRecommendation.titulo}</Text>
          <Text style={styles.username}>Por: {latestRecommendation.usuario}</Text>
          <Text style={styles.description}>{latestRecommendation.descricao}</Text>
          {/* Use o ícone localizado na pasta assets */}
          <TouchableOpacity onPress={handleRedirect}>
            <Image source={Icon} style={styles.icon} />
          </TouchableOpacity>
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
  },
  recommendationContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color:'white',
  },
  username: {
    marginBottom: 5,
    color: 'white',
  },
  description: {
    marginBottom: 10,
    color: 'white',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 10,
    width:50,
    height: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default RecommendationForm;
