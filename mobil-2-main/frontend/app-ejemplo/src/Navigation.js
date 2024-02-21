import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Menu from "./componentes/home/Menu";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ListComponent from "./componentes/list/List";
import Name from './screen/lista/Name'
import Chat from "./screen/chat/Chat";
import PdfGPT from "./screen/pdf/PdfGPT";
import { ScrollView } from 'react-native';

const Tab = createBottomTabNavigator()

const Navigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Bienvenido" component={Menu} options={{
                tabBarLabel: 'Página Principal',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }} />


            <Tab.Screen
                name={'Listado de los Perfiles'}
                component={() => (
                    <ScrollView>
                        <ListComponent />
                    </ScrollView>
                )}
                options={{
                    tabBarLabel: 'Listado',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name={'clipboard-list'} color={color} size={size} />
                    ),
                }}
            />
            
            <Tab.Screen name={'nombre'} component={Name} options={{
                tabBarLabel: 'Nombre',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name={'account'} color={color} size={size} />
                )
            }} />
            <Tab.Screen name={'openIA'} component={Chat} options={{
                tabBarLabel: 'openIA',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name={'brain'} color={color} size={size} />
                )
            }} />
            <Tab.Screen name={'pdf'} component={PdfGPT} options={{
                tabBarLabel: 'pdf',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name={'file-pdf-box'} color={color} size={size} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default Navigation