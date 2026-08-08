import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AppColors } from '../../theme/ThemeContext';
import type { Post } from '../../types/home';

type PostCardProps = Readonly<{
    post: Post;
    colors: AppColors;
    onToggleLike: (postId: string) => void;
    onReact: (postId: string, reaction: 'love' | 'laugh' | 'cry') => void;
    onDelete: (postId: string) => void;
}>;

/**
 * Affiche une publication complète avec son auteur, son texte, une zone d’image et les actions sociales.
 * Ce composant est autonome afin de pouvoir être réutilisé dans plusieurs listes si besoin.
 */
export function PostCard({ post, colors, onToggleLike, onReact, onDelete }: PostCardProps) {
    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.header}>
                <View style={styles.authorBlock}>
                    <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
                        <Text style={[styles.avatarText, { color: colors.primaryPressed }]}>{post.author.charAt(0)}</Text>
                    </View>
                    <View style={styles.authorInfo}>
                        <Text style={[styles.author, { color: colors.textPrimary }]}>{post.author}</Text>
                        <Text style={[styles.time, { color: colors.textSecondary }]}>{post.time}</Text>
                    </View>
                </View>

                <Pressable onPress={() => onDelete(post.id)} style={styles.deleteButton}>
                    <Text style={[styles.deleteText, { color: colors.error }]}>Supprimer</Text>
                </Pressable>
            </View>

            <Text style={[styles.content, { color: colors.textPrimary }]}>{post.content}</Text>

            <View style={[styles.imagePlaceholder, { backgroundColor: colors.primarySoft }]}>
                <Text style={[styles.imageLabel, { color: colors.primaryPressed }]}>{post.imageLabel}</Text>
            </View>

            <View style={styles.actions}>
                <Pressable onPress={() => onToggleLike(post.id)} style={styles.actionButton}>
                    <Text style={post.isLiked ? [styles.actionText, { color: colors.error }] : [styles.actionText, { color: colors.textSecondary }]}>♥ {post.likes}</Text>
                </Pressable>

                <View style={styles.reactionRow}>
                    <Pressable onPress={() => onReact(post.id, 'love')} style={styles.reactionButton}>
                        <Text style={styles.reactionEmoji}>😍</Text>
                    </Pressable>
                    <Pressable onPress={() => onReact(post.id, 'laugh')} style={styles.reactionButton}>
                        <Text style={styles.reactionEmoji}>😂</Text>
                    </Pressable>
                    <Pressable onPress={() => onReact(post.id, 'cry')} style={styles.reactionButton}>
                        <Text style={styles.reactionEmoji}>😢</Text>
                    </Pressable>
                </View>

                <View style={styles.actionButton}>
                    <Text style={[styles.actionText, { color: colors.textSecondary }]}>💬 {post.comments}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { borderRadius: 24, padding: 16, borderWidth: 1, marginBottom: 16 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    authorBlock: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    avatar: { width: 44, height: 44, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontSize: 18, fontWeight: '800' },
    authorInfo: { marginLeft: 12 },
    author: { fontSize: 15, fontWeight: '700' },
    time: { fontSize: 12, marginTop: 2 },
    content: { marginTop: 14, fontSize: 15, lineHeight: 22 },
    imagePlaceholder: { marginTop: 14, minHeight: 150, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    imageLabel: { fontSize: 14, fontWeight: '700' },
    actions: { flexDirection: 'row', marginTop: 14, gap: 8, flexWrap: 'wrap' },
    actionButton: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: '#fff8f4' },
    actionText: { fontSize: 13, fontWeight: '700' },
    reactionRow: { flexDirection: 'row', gap: 6 },
    reactionButton: { width: 34, height: 34, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff8f4' },
    reactionEmoji: { fontSize: 16 },
    deleteButton: { paddingHorizontal: 8, paddingVertical: 4 },
    deleteText: { fontSize: 12, fontWeight: '700' },
});
