import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ProfileScreen } from '../screens/ProfileScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { FamilyScreen } from '../screens/FamilyScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

type PlaceholderProps = Readonly<{ label: string }>;
// Un composant d'affichage temporaire pour les écrans non encore implémentés.
function Placeholder(props: PlaceholderProps) {
    const { label } = props;
    return (
        <View style={styles.center}>
            <Text>{label}</Text>
        </View>
    );
}

export default function BottomTabs() {
    // Définition des onglets de navigation inférieure avec leurs icônes et écrans associés.
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused }) => {
                    let name = 'home-outline';
                    if (route.name === 'Home') name = focused ? 'home' : 'home-outline';
                    if (route.name === 'Family') name = focused ? 'people' : 'people-outline';
                    if (route.name === 'Notifications') name = focused ? 'notifications' : 'notifications-outline';
                    if (route.name === 'Profile') name = focused ? 'person' : 'person-outline';
                    return <Ionicons name={name as any} size={24} color={focused ? '#000' : '#666'} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Family" component={FamilyScreen} />

            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    tabBar: {
        height: 60,
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: '#F8DED3',
    },

});
