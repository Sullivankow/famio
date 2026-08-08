import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { AppColors } from '../../theme/ThemeContext';
import type { Comment, Post } from '../../types/home';

type PostCardProps = Readonly<{
    post: Post;
    colors: AppColors;
    onToggleLike: (postId: string) => void;
    onReact: (postId: string, reaction: 'love' | 'laugh' | 'cry') => void;
    onDelete: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onEditComment: (postId: string, commentId: string, text: string) => void;
    onDeleteComment: (postId: string, commentId: string) => void;
}>;

/**
 * Affiche une publication complète avec son auteur, son texte, une zone d’image et les actions sociales.
 * Ce composant est autonome afin de pouvoir être réutilisé dans plusieurs listes si besoin.
 */
export function PostCard({ post, colors, onToggleLike, onReact, onDelete, onAddComment, onEditComment, onDeleteComment }: PostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [commentDraft, setCommentDraft] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

    function handleSubmitComment() {
        const trimmedText = commentDraft.trim();

        if (!trimmedText) {
            return;
        }

        if (editingCommentId) {
            onEditComment(post.id, editingCommentId, trimmedText);
            setEditingCommentId(null);
        } else {
            onAddComment(post.id, trimmedText);
        }

        setCommentDraft('');
        setShowComments(true);
    }

    function handleStartEdit(comment: Comment) {
        setEditingCommentId(comment.id);
        setCommentDraft(comment.text);
        setShowComments(true);
    }

    function handleCancelEdit() {
        setEditingCommentId(null);
        setCommentDraft('');
    }

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

                <View style={styles.actionsSpacer} />

                <Pressable onPress={() => setShowComments((currentValue) => !currentValue)} style={styles.actionButton}>
                    <Text style={[styles.actionText, { color: colors.textSecondary }]}>💬 {post.commentList.length}</Text>
                </Pressable>
            </View>

            {showComments ? (
                <View style={styles.commentsSection}>
                    {post.commentList.map((comment) => (
                        <View key={comment.id} style={[styles.commentItem, { backgroundColor: colors.primarySoft }]}>
                            <View style={styles.commentHeader}>
                                <Text style={[styles.commentAuthor, { color: colors.textPrimary }]}>{comment.author}</Text>
                                {comment.isMine ? (
                                    <View style={styles.commentActions}>
                                        <Pressable onPress={() => handleStartEdit(comment)}>
                                            <Text style={[styles.commentActionText, { color: colors.primaryPressed }]}>Modifier</Text>
                                        </Pressable>
                                        <Pressable onPress={() => onDeleteComment(post.id, comment.id)}>
                                            <Text style={[styles.commentActionText, { color: colors.error }]}>Supprimer</Text>
                                        </Pressable>
                                    </View>
                                ) : null}
                            </View>
                            <Text style={[styles.commentText, { color: colors.textSecondary }]}>{comment.text}</Text>
                        </View>
                    ))}

                    <TextInput
                        multiline
                        onChangeText={setCommentDraft}
                        placeholder={editingCommentId ? 'Modifier votre commentaire...' : 'Écrivez un commentaire...'}
                        placeholderTextColor={colors.textSecondary}
                        style={[styles.commentInput, { color: colors.textPrimary, borderColor: colors.border }]}
                        value={commentDraft}
                    />

                    <View style={styles.commentFooter}>
                        {editingCommentId ? (
                            <Pressable onPress={handleCancelEdit} style={styles.secondaryCommentButton}>
                                <Text style={[styles.secondaryCommentButtonText, { color: colors.textSecondary }]}>Annuler</Text>
                            </Pressable>
                        ) : null}
                        <Pressable onPress={handleSubmitComment} style={[styles.primaryCommentButton, { backgroundColor: colors.primary }]}>
                            <Text style={[styles.primaryCommentButtonText, { color: colors.onPrimary }]}>
                                {editingCommentId ? 'Enregistrer' : 'Publier'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            ) : null}
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
    actions: { flexDirection: 'row', marginTop: 14, gap: 8, flexWrap: 'wrap', alignItems: 'center' },
    actionsSpacer: { flex: 1, minWidth: 8 },
    actionButton: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: '#fff8f4' },
    actionText: { fontSize: 13, fontWeight: '700' },
    reactionRow: { flexDirection: 'row', gap: 6 },
    reactionButton: { width: 34, height: 34, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff8f4' },
    reactionEmoji: { fontSize: 16 },
    deleteButton: { paddingHorizontal: 8, paddingVertical: 4 },
    deleteText: { fontSize: 12, fontWeight: '700' },
    commentsSection: { marginTop: 12, gap: 10 },
    commentItem: { borderRadius: 14, padding: 10 },
    commentHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    commentAuthor: { fontSize: 13, fontWeight: '700' },
    commentActions: { flexDirection: 'row', gap: 10 },
    commentActionText: { fontSize: 12, fontWeight: '700' },
    commentText: { marginTop: 4, fontSize: 13, lineHeight: 18 },
    commentInput: { minHeight: 70, borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 },
    commentFooter: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
    secondaryCommentButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
    secondaryCommentButtonText: { fontSize: 12, fontWeight: '700' },
    primaryCommentButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
    primaryCommentButtonText: { fontSize: 12, fontWeight: '800' },
});
