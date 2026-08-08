import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { AppColors } from '../../theme/ThemeContext';
import type { Story } from '../../types/home';
import { StoryItem } from './StoryItem';

type StoriesSectionProps = Readonly<{
    stories: Story[];
    colors: AppColors;
}>;

/**
 * Rend la liste horizontale des stories à partir d’une collection de données.
 * Il sert d’enveloppe simple pour éviter de surcharger le screen principal.
 */
export function StoriesSection({ stories, colors }: StoriesSectionProps) {
    return (
        <View style={styles.section}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Pressable style={[styles.addStoryCard, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                    <View style={[styles.addStoryCircle, { backgroundColor: colors.primary }]}>
                        <Text style={styles.addStoryPlus}>+</Text>
                    </View>
                    <Text style={[styles.addStoryText, { color: colors.textPrimary }]}>Votre story</Text>
                </Pressable>

                {stories.map((story) => (
                    <StoryItem key={story.id} story={story} colors={colors} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginTop: 18 },
    content: { gap: 12, paddingHorizontal: 2, alignItems: 'center' },
    addStoryCard: { width: 74, alignItems: 'center', paddingVertical: 4, borderWidth: 1, borderRadius: 16 },
    addStoryCircle: { width: 56, height: 56, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
    addStoryPlus: { color: '#fff', fontSize: 28, fontWeight: '700', lineHeight: 28 },
    addStoryText: { marginTop: 8, fontSize: 12, fontWeight: '600' },
});
