import React, { useState } from 'react';
import { View, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Button, TextInput, Title, Subheading, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';

type CancerFormData = {
  radius_mean: string;
  texture_mean: string;
  perimeter_mean: string;
  area_mean: string;
  smoothness_mean: string;
  compactness_mean: string;
  concavity_mean: string;
  concave_points_mean: string;
  symmetry_mean: string;
  fractal_dimension_mean: string;
  radius_se: string;
  texture_se: string;
  perimeter_se: string;
  area_se: string;
  smoothness_se: string;
  compactness_se: string;
  concavity_se: string;
  concave_points_se: string;
  symmetry_se: string;
  fractal_dimension_se: string;
  radius_worst: string;
  texture_worst: string;
  perimeter_worst: string;
  area_worst: string;
  smoothness_worst: string;
  compactness_worst: string;
  concavity_worst: string;
  concave_points_worst: string;
  symmetry_worst: string;
  fractal_dimension_worst: string;
};

export default function HomeScreen() {
  const initialFormData: CancerFormData = {
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: '',
    compactness_mean: '',
    concavity_mean: '',
    concave_points_mean: '',
    symmetry_mean: '',
    fractal_dimension_mean: '',
    radius_se: '',
    texture_se: '',
    perimeter_se: '',
    area_se: '',
    smoothness_se: '',
    compactness_se: '',
    concavity_se: '',
    concave_points_se: '',
    symmetry_se: '',
    fractal_dimension_se: '',
    radius_worst: '',
    texture_worst: '',
    perimeter_worst: '',
    area_worst: '',
    smoothness_worst: '',
    compactness_worst: '',
    concavity_worst: '',
    concave_points_worst: '',
    symmetry_worst: '',
    fractal_dimension_worst: ''
  };

  const [formData, setFormData] = useState<CancerFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Ejemplo de datos BENIGNOS (no cancer)
  const loadBenignExample = () => {
    setFormData({
      radius_mean: '13.54',
      texture_mean: '14.36',
      perimeter_mean: '87.46',
      area_mean: '566.3',
      smoothness_mean: '0.09779',
      compactness_mean: '0.08129',
      concavity_mean: '0.06664',
      concave_points_mean: '0.04781',
      symmetry_mean: '0.1885',
      fractal_dimension_mean: '0.05766',
      radius_se: '0.2699',
      texture_se: '0.7886',
      perimeter_se: '2.058',
      area_se: '23.56',
      smoothness_se: '0.008462',
      compactness_se: '0.0146',
      concavity_se: '0.02387',
      concave_points_se: '0.01315',
      symmetry_se: '0.0198',
      fractal_dimension_se: '0.0023',
      radius_worst: '15.11',
      texture_worst: '19.26',
      perimeter_worst: '99.7',
      area_worst: '711.2',
      smoothness_worst: '0.144',
      compactness_worst: '0.1773',
      concavity_worst: '0.239',
      concave_points_worst: '0.1288',
      symmetry_worst: '0.2977',
      fractal_dimension_worst: '0.07259'
    });
  };

  // Ejemplo de datos MALIGNOS (cancer)
  const loadMalignantExample = () => {
    setFormData({
      radius_mean: '17.99',
      texture_mean: '10.38',
      perimeter_mean: '122.8',
      area_mean: '1001',
      smoothness_mean: '0.1184',
      compactness_mean: '0.2776',
      concavity_mean: '0.3001',
      concave_points_mean: '0.1471',
      symmetry_mean: '0.2419',
      fractal_dimension_mean: '0.07871',
      radius_se: '1.095',
      texture_se: '0.9053',
      perimeter_se: '8.589',
      area_se: '153.4',
      smoothness_se: '0.006399',
      compactness_se: '0.04904',
      concavity_se: '0.05373',
      concave_points_se: '0.01587',
      symmetry_se: '0.03003',
      fractal_dimension_se: '0.006193',
      radius_worst: '25.38',
      texture_worst: '17.33',
      perimeter_worst: '184.6',
      area_worst: '2019',
      smoothness_worst: '0.1622',
      compactness_worst: '0.6656',
      concavity_worst: '0.7119',
      concave_points_worst: '0.2654',
      symmetry_worst: '0.4601',
      fractal_dimension_worst: '0.1189'
    });
  };

  const validateField = (key: string, value: string): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return false;

    const ranges: Record<string, [number, number]> = {
      concave_points_mean: [0, 0.2],
      radius_mean: [5, 30],
      texture_mean: [5, 40],
      smoothness_mean: [0.05, 0.15],
      compactness_mean: [0, 0.4],
      concavity_mean: [0, 0.5],
      symmetry_mean: [0.1, 0.3],
      fractal_dimension_mean: [0.05, 0.1],
      concave_points_worst: [0, 0.3],
      radius_worst: [10, 40],
      texture_worst: [10, 50],
      smoothness_worst: [0.07, 0.2]
    };

    if (ranges[key]) {
      const [min, max] = ranges[key];
      return numValue >= min && numValue <= max;
    }
    return true;
  };

  const getFieldDescription = (key: string, value: string): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'Ingrese un valor numérico válido';

    const descriptions: Record<string, string> = {
      radius_mean: "Radio promedio de los núcleos celulares. Valores típicos: 5-30μm. >15μm puede ser preocupante.",
      texture_mean: "Desviación estándar de los valores de escala de grises. Valores típicos: 5-40.",
      perimeter_mean: "Perímetro celular promedio. Suele correlacionarse con el radio medio.",
      area_mean: "Área celular promedio. Valores típicos: 100-1000μm².",
      smoothness_mean: "Variación local en longitudes de radio. Valores típicos: 0.05-0.15.",
      compactness_mean: "Perímetro²/área - 1.0. Valores típicos: 0-0.4. >0.2 puede ser preocupante.",
      concavity_mean: "Severidad de las porciones cóncavas del contorno. Valores típicos: 0-0.5.",
      concave_points_mean: "Número de porciones cóncavas en el contorno. <0.1 suele ser benigno, >0.1 sugiere cáncer.",
      symmetry_mean: "Simetría celular. Valores típicos: 0.1-0.3.",
      fractal_dimension_mean: "Dimensión fractal (aproximación 'coastline'). Valores típicos: 0.05-0.1.",
      concave_points_worst: "Peor caso de puntos cóncavos. <0.2 suele ser benigno, >0.2 sugiere cáncer."
    };

    return descriptions[key] || "Característica de diagnóstico de células mamarias.";
  };

  const handlePredict = async () => {
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value === '')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      Alert.alert(
        'Campos incompletos',
        `Por favor complete los siguientes campos: ${emptyFields.join(', ')}`
      );
      return;
    }

    // Validación de rangos para campos clave
    const invalidFields = Object.entries(formData)
      .filter(([key, value]) => !validateField(key, value))
      .map(([key]) => key);

    if (invalidFields.length > 0) {
      Alert.alert(
        'Valores fuera de rango',
        `Los siguientes campos tienen valores inusuales: ${invalidFields.join(', ')}. ¿Desea continuar?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Continuar', onPress: sendPredictionRequest }
        ]
      );
      return;
    }

    sendPredictionRequest();
  };

  const sendPredictionRequest = async () => {
    setLoading(true);

    try {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
      );

      const response = await fetch('http://192.168.31.44:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la predicción');
      }

      const result = await response.json();
      router.push({
        pathname: '/results',
        params: result,
      });

    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'No se pudo conectar con el servidor'
      );
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Title style={{ marginBottom: 20, fontSize: 24, textAlign: 'center', color: '#2E86C1' }}>
        Diagnóstico de Cáncer de Mama
      </Title>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button
          mode="outlined"
          onPress={loadBenignExample}
          style={{ marginRight: 10, flex: 1 }}
          labelStyle={{ color: '#28B463' }}
        >
          Ejemplo Benigno
        </Button>
        <Button
          mode="outlined"
          onPress={loadMalignantExample}
          style={{ flex: 1 }}
          labelStyle={{ color: '#CB4335' }}
        >
          Ejemplo Maligno
        </Button>
      </View>

      {/* Sección: Características Principales */}
      <Subheading style={{ marginTop: 10, color: '#2E86C1', fontSize: 18 }}>
        Características Principales
      </Subheading>

      <TextInput
        label="Radius Mean (radio medio)"
        value={formData.radius_mean}
        onChangeText={(text) => setFormData({ ...formData, radius_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        right={<TextInput.Affix text="μm" />}
        error={!validateField('radius_mean', formData.radius_mean)}
      />
      <HelperText type={validateField('radius_mean', formData.radius_mean) ? 'info' : 'error'}>
        {getFieldDescription('radius_mean', formData.radius_mean)}
      </HelperText>

      <TextInput
        label="Texture Mean (textura media)"
        value={formData.texture_mean}
        onChangeText={(text) => setFormData({ ...formData, texture_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('texture_mean', formData.texture_mean)}
      />
      <HelperText type={validateField('texture_mean', formData.texture_mean) ? 'info' : 'error'}>
        {getFieldDescription('texture_mean', formData.texture_mean)}
      </HelperText>

      <TextInput
        label="Perimeter Mean (perímetro medio)"
        value={formData.perimeter_mean}
        onChangeText={(text) => setFormData({ ...formData, perimeter_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        right={<TextInput.Affix text="μm" />}
      />
      <HelperText type="info">
        {getFieldDescription('perimeter_mean', formData.perimeter_mean)}
      </HelperText>

      <TextInput
        label="Area Mean (área media)"
        value={formData.area_mean}
        onChangeText={(text) => setFormData({ ...formData, area_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        right={<TextInput.Affix text="μm²" />}
      />
      <HelperText type="info">
        {getFieldDescription('area_mean', formData.area_mean)}
      </HelperText>

      {/* Sección: Características de Forma */}
      <Subheading style={{ marginTop: 15, color: '#2E86C1', fontSize: 18 }}>
        Características de Forma
      </Subheading>

      <TextInput
        label="Smoothness Mean (suavidad media)"
        value={formData.smoothness_mean}
        onChangeText={(text) => setFormData({ ...formData, smoothness_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('smoothness_mean', formData.smoothness_mean)}
      />
      <HelperText type={validateField('smoothness_mean', formData.smoothness_mean) ? 'info' : 'error'}>
        {getFieldDescription('smoothness_mean', formData.smoothness_mean)}
      </HelperText>

      <TextInput
        label="Compactness Mean (compacidad media)"
        value={formData.compactness_mean}
        onChangeText={(text) => setFormData({ ...formData, compactness_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('compactness_mean', formData.compactness_mean)}
      />
      <HelperText type={validateField('compactness_mean', formData.compactness_mean) ? 'info' : 'error'}>
        {getFieldDescription('compactness_mean', formData.compactness_mean)}
      </HelperText>

      <TextInput
        label="Concavity Mean (concavidad media)"
        value={formData.concavity_mean}
        onChangeText={(text) => setFormData({ ...formData, concavity_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('concavity_mean', formData.concavity_mean)}
      />
      <HelperText type={validateField('concavity_mean', formData.concavity_mean) ? 'info' : 'error'}>
        {getFieldDescription('concavity_mean', formData.concavity_mean)}
      </HelperText>

      <TextInput
        label="Concave Points Mean (puntos cóncavos medios)"
        value={formData.concave_points_mean}
        onChangeText={(text) => setFormData({ ...formData, concave_points_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('concave_points_mean', formData.concave_points_mean)}
      />
      <HelperText type={validateField('concave_points_mean', formData.concave_points_mean) ? 'info' : 'error'}>
        {getFieldDescription('concave_points_mean', formData.concave_points_mean)}
      </HelperText>

      {/* Sección: Características Adicionales */}
      <Subheading style={{ marginTop: 15, color: '#2E86C1', fontSize: 18 }}>
        Otras Características
      </Subheading>

      <TextInput
        label="Symmetry Mean (simetría media)"
        value={formData.symmetry_mean}
        onChangeText={(text) => setFormData({ ...formData, symmetry_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('symmetry_mean', formData.symmetry_mean)}
      />
      <HelperText type={validateField('symmetry_mean', formData.symmetry_mean) ? 'info' : 'error'}>
        {getFieldDescription('symmetry_mean', formData.symmetry_mean)}
      </HelperText>

      <TextInput
        label="Fractal Dimension Mean (dimensión fractal media)"
        value={formData.fractal_dimension_mean}
        onChangeText={(text) => setFormData({ ...formData, fractal_dimension_mean: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('fractal_dimension_mean', formData.fractal_dimension_mean)}
      />
      <HelperText type={validateField('fractal_dimension_mean', formData.fractal_dimension_mean) ? 'info' : 'error'}>
        {getFieldDescription('fractal_dimension_mean', formData.fractal_dimension_mean)}
      </HelperText>

      {/* Sección: Peores Características */}
      <Subheading style={{ marginTop: 15, color: '#2E86C1', fontSize: 18 }}>
        Peores Características (valores más altos)
      </Subheading>

      <TextInput
        label="Concave Points Worst (peores puntos cóncavos)"
        value={formData.concave_points_worst}
        onChangeText={(text) => setFormData({ ...formData, concave_points_worst: text })}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
        error={!validateField('concave_points_worst', formData.concave_points_worst)}
      />
      <HelperText type={validateField('concave_points_worst', formData.concave_points_worst) ? 'info' : 'error'}>
        {getFieldDescription('concave_points_worst', formData.concave_points_worst)}
      </HelperText>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#2E86C1" />
      ) : (
        <Button
          mode="contained"
          onPress={handlePredict}
          style={{ marginTop: 30, backgroundColor: '#2E86C1' }}
          disabled={loading}
          labelStyle={{ fontSize: 16 }}
        >
          Realizar Diagnóstico
        </Button>
      )}
    </ScrollView>
  );
}
