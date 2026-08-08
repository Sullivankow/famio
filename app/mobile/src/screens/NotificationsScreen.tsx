import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const sample = [
    { id: '1', text: 'Alice a commenté votre post' },
    { id: '2', text: 'Bob vous a envoyé une demande' },
];

export function NotificationsScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={sample}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.text}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Aucune notification</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
    empty: { padding: 16, textAlign: 'center' },
});
