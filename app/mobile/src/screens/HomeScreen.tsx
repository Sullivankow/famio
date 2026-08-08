import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CreatePostComposer } from '../components/home/CreatePostComposer';
import { StoriesSection } from '../components/home/StoriesSection';
import { PostCard } from '../components/home/PostCard';
import { mockPosts, mockStories } from '../data/home.mock';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAppTheme } from '../theme/ThemeContext';

export function HomeScreen() {
    const { theme } = useAppTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);
    const [posts, setPosts] = useState(mockPosts);
    const [composerOpen, setComposerOpen] = useState(false);
    const [draftText, setDraftText] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false);

    /**
     * Bascule l’état du composeur de publication pour afficher ou cacher le formulaire.
     */
    function handleToggleComposer() {
        setComposerOpen((currentValue) => !currentValue);
    }

    /**
     * Ajoute un faux état « photo attachée » pour simuler l’ajout d’un média.
     * Cette logique pourra ensuite être remplacée par un vrai sélecteur de fichiers.
     */
    function handleAddPhoto() {
        setHasPhoto(true);
    }

    /**
     * Crée une nouvelle publication à partir du texte saisi et de l’état d’image.
     * Elle est ajoutée au début du fil afin d’imiter un comportement de réseau social.
     */
    function handlePublish() {
        if (!draftText.trim()) {
            return;
        }

        const newPost = {
            id: `post-${Date.now()}`,
            author: 'Moi',
            time: 'À l’instant',
            content: draftText.trim(),
            imageLabel: hasPhoto ? 'Photo ajoutée' : 'Publication textuelle',
            likes: 0,
            comments: 0,
            isLiked: false,
        };

        setPosts((currentPosts) => [newPost, ...currentPosts]);
        setDraftText('');
        setHasPhoto(false);
        setComposerOpen(false);
    }

    /**
     * Met à jour le compteur de likes pour une publication donnée.
     */
    function handleToggleLike(postId: string) {
        setPosts((currentPosts) =>
            currentPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    }
                    : post,
            ),
        );
    }

    /**
     * Supprime une publication du fil lorsque l’utilisateur choisit de l’effacer.
     */
    function handleDelete(postId: string) {
        setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
    }

    /**
     * Permet d’ajouter une réaction supplémentaire à une publication sans complexifier la logique.
     */
    function handleReact(postId: string, reaction: 'love' | 'laugh' | 'cry') {
        setPosts((currentPosts) =>
            currentPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments + 1,
                    }
                    : post,
            ),
        );

        if (reaction === 'love') {
            console.log('réaction love ajoutée');
        }
        if (reaction === 'laugh') {
            console.log('réaction rire ajoutée');
        }
        if (reaction === 'cry') {
            console.log('réaction triste ajoutée');
        }
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.eyebrow, { color: theme.colors.primaryPressed }]}>FAMIO</Text>
                        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Bienvenue chez toi</Text>
                    </View>
                    <Pressable onPress={() => navigation.goBack()} style={[styles.backButton, { borderColor: theme.colors.border }]}>
                        <Text style={[styles.backButtonText, { color: theme.colors.textPrimary }]}>←</Text>
                    </Pressable>
                </View>

                <StoriesSection stories={mockStories} colors={theme.colors} />

                <CreatePostComposer
                    colors={theme.colors}
                    draftText={draftText}
                    hasPhoto={hasPhoto}
                    isOpen={composerOpen}
                    onAddPhoto={handleAddPhoto}
                    onChangeText={setDraftText}
                    onPublish={handlePublish}
                    onToggleOpen={handleToggleComposer}
                />

                <View style={styles.sectionTitleRow}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Actualités familiales</Text>
                    <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Aujourd’hui</Text>
                </View>

                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        colors={theme.colors}
                        onDelete={handleDelete}
                        onReact={handleReact}
                        onToggleLike={handleToggleLike}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (colors: ReturnType<typeof useAppTheme>['theme']['colors']) =>
    StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: colors.background },
        content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 },
        header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
        eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
        title: { marginTop: 4, fontSize: 24, fontWeight: '800' },
        backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 14 },
        backButtonText: { fontSize: 20, fontWeight: '700' },
        sectionTitleRow: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        sectionTitle: { fontSize: 17, fontWeight: '800' },
        sectionSubtitle: { fontSize: 12, fontWeight: '700' },
    });
