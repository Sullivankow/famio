import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const members = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
];

export function FamilyScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={members}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
    name: { fontSize: 16 },
});
