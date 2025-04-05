import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ResultsScreen() {
  const params = useLocalSearchParams();

  // Aseguramos que prediction y probability sean strings
  const prediction = Array.isArray(params.prediction) ? params.prediction[0] : params.prediction;
  const probability = Array.isArray(params.probability) ? params.probability[0] : params.probability;

  const isMalignant = prediction === 'Maligno';
  const probabilityNumber = probability ? parseFloat(probability) : 0;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.resultText,
        { color: isMalignant ? '#ff4444' : '#4CAF50' }
      ]}>
        {prediction || 'Sin resultado'}
      </Text>
      <Text style={styles.probabilityText}>
        Probabilidad: {(probabilityNumber * 100).toFixed(2)}%
      </Text>
      {isMalignant && (
        <Text style={styles.warningText}>
          ⚠️ Consulta a un especialista urgentemente
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  probabilityText: {
    fontSize: 18,
    marginBottom: 20,
  },
  warningText: {
    color: '#ff4444',
    textAlign: 'center',
  }
});
