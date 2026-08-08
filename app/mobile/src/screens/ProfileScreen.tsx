import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={{ uri: 'https://placehold.co/100x100' }} />
                <Text style={styles.name}>Utilisateur</Text>
            </View>
            <View style={styles.body}>
                <Text>Profil de l'utilisateur — contenu à compléter.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { alignItems: 'center', padding: 24 },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
    name: { fontSize: 18, fontWeight: '600' },
    body: { flex: 1, padding: 16 },
});
