import { StyleSheet, Text, View } from 'react-native';
import type { AppColors } from '../../theme/ThemeContext';
import type { Story } from '../../types/home';

type StoryItemProps = Readonly<{
    story: Story;
    colors: AppColors;
}>;

/**
 * Affiche un avatar de story avec un indicateur visuel pour signaler un contenu nouveau.
 * Ce composant est utilisé dans la barre horizontale des stories.
 */
export function StoryItem({ story, colors }: StoryItemProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.avatar, { backgroundColor: story.avatarColor }]}>
                <Text style={styles.avatarText}>{story.name.charAt(0)}</Text>
            </View>
            {story.isNew ? <View style={[styles.badge, { backgroundColor: colors.primary }]} /> : null}
            <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
                {story.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', width: 74 },
    avatar: { width: 56, height: 56, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: '#fff', fontSize: 22, fontWeight: '800' },
    badge: { width: 14, height: 14, borderRadius: 999, marginTop: -12, marginLeft: 36, borderWidth: 2, borderColor: '#fff' },
    name: { marginTop: 8, fontSize: 12, fontWeight: '600' },
});
