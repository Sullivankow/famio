import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { AppColors } from '../../theme/ThemeContext';

type CreatePostComposerProps = Readonly<{
    colors: AppColors;
    isOpen: boolean;
    draftText: string;
    hasPhoto: boolean;
    onChangeText: (value: string) => void;
    onToggleOpen: () => void;
    onAddPhoto: () => void;
    onPublish: () => void;
}>;

/**
 * Affiche un mini composeur de publication, avec un mode réduit pour garder la feed propre.
 * Lorsque l’utilisateur ouvre le formulaire, il peut rédiger son message, joindre une photo et publier.
 */
export function CreatePostComposer({
    colors,
    isOpen,
    draftText,
    hasPhoto,
    onChangeText,
    onToggleOpen,
    onAddPhoto,
    onPublish,
}: CreatePostComposerProps) {
    if (!isOpen) {
        return (
            <Pressable
                accessibilityRole="button"
                onPress={onToggleOpen}
                style={[styles.closedCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
                <Text style={[styles.closedTitle, { color: colors.textPrimary }]}>Créer une publication</Text>
                <Text style={[styles.closedHint, { color: colors.textSecondary }]}>Partagez un moment, une photo ou une pensée avec votre famille</Text>
            </Pressable>
        );
    }

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>Nouvelle publication</Text>
                <Pressable onPress={onToggleOpen} style={styles.closeButton}>
                    <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>✕</Text>
                </Pressable>
            </View>

            <TextInput
                multiline
                maxLength={220}
                onChangeText={onChangeText}
                placeholder="Écrivez quelque chose à votre famille..."
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { color: colors.textPrimary, borderColor: colors.border }]}
                value={draftText}
            />

            <View style={styles.actionsRow}>
                <Pressable
                    accessibilityRole="button"
                    onPress={onAddPhoto}
                    style={[styles.secondaryButton, { backgroundColor: colors.primarySoft }]}
                >
                    <Text style={[styles.secondaryButtonText, { color: colors.primaryPressed }]}>
                        {hasPhoto ? '📸 Photo ajoutée' : '📸 Ajouter une photo'}
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={onPublish}
                    style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                >
                    <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>Publier</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    closedCard: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 14, marginTop: 16 },
    closedTitle: { fontSize: 15, fontWeight: '800' },
    closedHint: { marginTop: 4, fontSize: 12, lineHeight: 18 },
    card: { borderWidth: 1, borderRadius: 22, padding: 14, marginTop: 16 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    title: { fontSize: 16, fontWeight: '800' },
    closeButton: { padding: 4 },
    closeButtonText: { fontSize: 16, fontWeight: '700' },
    input: { marginTop: 12, minHeight: 96, borderWidth: 1, borderRadius: 16, padding: 12, textAlignVertical: 'top', fontSize: 15 },
    actionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 12 },
    secondaryButton: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
    secondaryButtonText: { fontSize: 13, fontWeight: '700' },
    primaryButton: { borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
    primaryButtonText: { fontSize: 14, fontWeight: '800' },
});
