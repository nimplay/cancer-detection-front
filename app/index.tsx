import { View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [formData, setFormData] = useState({
    radius_mean: '',
    texture_mean: '',
    // ... (añade todos los campos necesarios)
  });
  const router = useRouter();

  const handlePredict = async () => {
    try {
      // Simulación de llamada a la API (reemplaza con tu endpoint real)
      const mockResponse = {
        prediction: Math.random() > 0.5 ? 'Maligno' : 'Benigno',
        probability: Math.random().toFixed(2)
      };

      router.push({
        pathname: '/results',
        params: mockResponse
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Radius Mean"
        value={formData.radius_mean}
        onChangeText={(text) => setFormData({...formData, radius_mean: text})}
        keyboardType="numeric"
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      {/* Añade más campos aquí */}
      <Button
        title="Predecir"
        onPress={handlePredict}
      />
    </View>
  );
}
