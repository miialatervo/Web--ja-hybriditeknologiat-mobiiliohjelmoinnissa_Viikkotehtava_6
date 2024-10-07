import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const URL = ''; //Lisää API-key

export default function App() {
  const [imageURL, setImageURL] = useState('');
  const [weekday, setWeekday] = useState('Maanantai');

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then((json) => {
        if (json.length > 0) {
          setImageURL(json[0].url);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const today = new Date();
    const daysOfWeek = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"];
    setWeekday(daysOfWeek[today.getDay()]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Päivän kisu</Text>
      <Text>{weekday}</Text>
      {imageURL ? (
        <Image source={{ uri: imageURL }} style={styles.catImage} />
      ) : (
        <Text>Ladataan kuvaa...</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFC0CB',
    fontFamily: 'Times New Roman',
    marginBottom: 10,
  },
  catImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
