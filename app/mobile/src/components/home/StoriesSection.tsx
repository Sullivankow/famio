import { ScrollView, StyleSheet, View } from 'react-native';
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
                {stories.map((story) => (
                    <StoryItem key={story.id} story={story} colors={colors} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginTop: 18 },
    content: { gap: 12, paddingHorizontal: 2 },
});
