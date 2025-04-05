import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';

export default function ResultsScreen() {
  const params = useLocalSearchParams();

  // Aseguramos que los parámetros sean strings
  const prediction = Array.isArray(params.prediction) ? params.prediction[0] : params.prediction;
  const probability = Array.isArray(params.probability) ? params.probability[0] : params.probability;
  const featureImportances = params.feature_importances
    ? JSON.parse(Array.isArray(params.feature_importances) ? params.feature_importances[0] : params.feature_importances)
    : null;

  const isMalignant = prediction === 'Maligno';
  const probabilityNumber = probability ? parseFloat(probability) : 0;
  const benignProbability = isMalignant ? 1 - probabilityNumber : probabilityNumber;
  const malignantProbability = isMalignant ? probabilityNumber : 1 - probabilityNumber;

  // Datos para el gráfico de pastel
  const pieChartData = [
    {
      name: 'Benigno',
      population: benignProbability * 100,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Maligno',
      population: malignantProbability * 100,
      color: '#ff4444',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  // Datos para el gráfico de barras (si hay feature importances)
  let barChartData = null;
  if (featureImportances) {
    const topFeatures = Object.entries(featureImportances)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, value]) => ({
        name: key.replace(/_/g, ' '),
        value: Number(value) * 100
      }));

    barChartData = {
      labels: topFeatures.map(f => f.name),
      datasets: [{
        data: topFeatures.map(f => f.value)
      }]
    };
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <View style={styles.resultContainer}>
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
      </Card>

      {/* Gráfico de pastel */}
      <Card style={styles.card}>
        <Text style={styles.chartTitle}>Distribución de Probabilidades</Text>
        <PieChart
          data={pieChartData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </Card>

      {/* Gráfico de barras (si hay datos) */}
      {barChartData && (
        <Card style={styles.card}>
          <Text style={styles.chartTitle}>Características más relevantes</Text>
          <BarChart
            data={barChartData}
            width={350}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: '#1e88e5',
              backgroundGradientFrom: '#1e88e5',
              backgroundGradientTo: '#1e88e5',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </Card>
      )}

      {/* Información adicional */}
      <Card style={styles.card}>
        <Text style={styles.infoTitle}>Interpretación de resultados</Text>
        <Text style={styles.infoText}>
          {isMalignant
            ? 'Un diagnóstico maligno indica alta probabilidad de cáncer. Se recomienda:'
            : 'Un diagnóstico benigno indica baja probabilidad de cáncer. Recomendaciones:'}
        </Text>
        <Text style={styles.infoBullet}>
          {isMalignant
            ? '• Contactar con un oncólogo inmediatamente\n• Realizar pruebas adicionales\n• No entrar en pánico - muchos cánceres son tratables'
            : '• Seguimiento médico regular\n• Autoexámenes mensuales\n• Mamografía anual si es mayor de 40 años'}
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40
  },
  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white'
  },
  resultContainer: {
    alignItems: 'center',
    padding: 10
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  probabilityText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center'
  },
  warningText: {
    color: '#ff4444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333'
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
    alignSelf: 'center'
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555'
  },
  infoBullet: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22
  }
});
