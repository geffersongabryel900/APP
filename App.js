import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigator } from './src/navigation/stackNavigator';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeScreen } from './src/pages/home'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Cabecalho from './src/components/Cabecalho';
import NovosItens from './src/components/NovosItens';
import AdicionarItem from './src/components/AdicionartItem';

function Profile() {

  const [vari, setvari] = useState([
    { nome: 'Alfa: perda ou alteração do olfato e do paladar, febre, tosse persis- \ntente, calafrios, perda de apetite e dor muscular;', key: 1 },
    { nome: 'Beta: febre, tosse, dor de garganta, falta de ar, diarreia, vômito, dor \nno corpo, cansaço e fadiga;', key: 2 },
    { nome: 'Gama: febre, tosse, dor de garganta, diarreia, vômito, dor no corpo, \ncansaço e fadiga;', key: 3 },
    { nome: 'Delta: febre, coriza, dor de cabeça, espirros, dor de garganta e tosse \npersistente;', key: 4 },
    { nome: 'Ômicron: cansaço extremo, dor no corpo, dor de cabeça, coriza\ncongestão nasal e dor de garganta;', key: 5 },
  ])
  return (
    <View style={styles.Design}>
      <Text>Quais os sintomas do COVID-19? {'\n'}{'\n'}</Text>
      <Text style={styles.Text2}>Os sinais e sintomas clínicos são principalmente respiratórios, semelhantes aos de um resfriado comum: febre de início súbito, acompanhada de tosse, dor de garganta e pelo menos um dos sintomas: dor de cabeça, dor muscular e dor articular. Alguns podem apresentar ainda sintomas gastrointestinais.{'\n'}

        Em casos mais graves, podem também causar infecção do trato respiratório inferior, como as pneumonias. As formas mais graves têm se manifestado em pessoa reconhecidamente vulneráveis a outros vírus respiratórios, como idosos, doentes crônicos e imunossuprimidos. As crianças tendem a ter sintomas mais leves em comparação com os adultos.{'\n'}{'\n'}

        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.key}
          data={vari}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.nome}</Text>
          )}
        />
      </Text>

      <Image
        source={require('./src/pages/cov.jpg')}
        style={{ width: 450, height: 350, resizeMode: 'contain', marginTop: 15, }}
      />
    </View>
  );
}

function Notifications() {
  return (
    <View style={styles.Design}>
      <Text style={styles.Text2}>Medicamentos aprovados para tratamento da Covid-19 {'\n'}{'\n'}</Text>
      <Text style={styles.Text2}>Assim como as vacinas, os medicamentos para tratamento da Covid-19 também podem ser aprovados por meio do uso emergencial, além do registro sanitário. Conheça abaixo os medicamentos aprovados:{'\n'} {'\n'}
        Remdesivir
        - para o tratamento da doença causada pelo coronavírus de 2019 (Covid-19) em adultos e adolescentes (com idade igual ou superior a 12 anos e com peso corporal de, pelo menos, 40 kg). O medicamento somente será administrado para pacientes com pneumonia que precisam de oxigênio extra para ajudá-los a respirar, mas que não estejam sob ventilação artificial (quando são usados meios mecânicos para auxiliar ou substituir a respiração espontânea). {'\n'}{'\n'}
        Paracetamol
        - é um medicamento indicado para o tratamento de febre e também colabora com auxílio temporário a dores leves e moderadas. Pode ser utilizado na redução de dores relacionadas à resfriados, como dor de cabeça e dor de garganta. Ainda é efetivo para reduzir o desconforto da dor de dente. {'\n'}{'\n'}
        Dipirona
        - é um medicamento com ação analgésica e antipirética, recomendado para tratar sintomas como dor e febre. É comumente utilizada no tratamento de gripes e resfriados, nevralgias, dores de cabeça, reumatismo muscular, artrites e outras crises dolorosas. 
      </Text>
    </View>
  );
}

function Venda() {

  const [lista, setLista] = useState();

  const apertarItem = (key) => {
    setLista((prevLista) => {
      return prevLista.filter((texto) => texto.key != key);
    });
  };

  useEffect(() => {
    Axios.get("http://192.168.184.6:3001/item").then(
      (response) => {
        setLista(response.data)
      }
    )
  }, [lista])

  const submeterInformacao = (texto) => {
    Axios.post("http://192.168.184.6:3001/item", { item: texto })
  };
  return (
    <View style={styles.container}>
      <Cabecalho />

      <View style={styles.conteudo}>
        <AdicionarItem funcao={submeterInformacao} />

        <View style={styles.estilolista}>
          <FlatList
            data={lista}
            renderItem={({ item }) => (
              <NovosItens props={item} funcao={apertarItem} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#3267F5',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Sintomas"
        component={Profile}
        options={{
          tabBarLabel: 'Sintomas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="emoticon-sick" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Remédios"
        component={Notifications}
        options={{
          tabBarLabel: 'Remédios',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="medical-services" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Venda"
        component={Venda}
        options={{
          tabBarLabel: 'Venda',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hand-holding-medical" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  Design: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },

  Text2: {
    textAlign: 'justify',
    marginLeft: 10,
    marginEnd: 10,
  },

  item: {
    fontSize: 14,
    textAlign: 'justify',
  },

  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
  },

  conteudo: {
    padding: 40,
  },
});