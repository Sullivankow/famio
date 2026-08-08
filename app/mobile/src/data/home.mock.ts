import type { Post, Story } from '../types/home';

export const mockStories: Story[] = [
  { id: 'story-1', name: 'Maman', avatarColor: '#F08C68', isNew: true },
  { id: 'story-2', name: 'Léo', avatarColor: '#4F8A6B' },
  { id: 'story-3', name: 'Nora', avatarColor: '#E8754D' },
  { id: 'story-4', name: 'Papa', avatarColor: '#725F58' },
  { id: 'story-5', name: 'Mia', avatarColor: '#A64D2D' },
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: 'Maman',
    time: 'Il y a 20 min',
    content: 'Un moment simple et précieux à la maison avec les enfants. Le bonheur est parfois dans les petits détails.',
    imageLabel: 'Repas familial en plein air',
    likes: 24,
    comments: 3,
    commentList: [
      { id: 'comment-1', author: 'Maman', text: 'J’adore ce moment de partage.', isMine: false },
      { id: 'comment-2', author: 'Léo', text: 'Très belle idée !', isMine: false },
      { id: 'comment-3', author: 'Moi', text: 'On devrait refaire ça samedi.', isMine: true },
    ],
    isLiked: false,
  },
  {
    id: 'post-2',
    author: 'Léo',
    time: 'Il y a 1 h',
    content: 'Nouveau dessin pour la galerie familiale. J’ai hâte que tout le monde le voit.',
    imageLabel: 'Dessin coloré',
    likes: 31,
    comments: 2,
    commentList: [
      { id: 'comment-4', author: 'Nora', text: 'Il est magnifique !', isMine: false },
      { id: 'comment-5', author: 'Moi', text: 'Tu peux l’ajouter à la galerie.', isMine: true },
    ],
    isLiked: true,
  },
];
