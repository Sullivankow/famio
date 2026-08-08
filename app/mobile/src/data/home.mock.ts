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
    comments: 5,
    isLiked: false,
  },
  {
    id: 'post-2',
    author: 'Léo',
    time: 'Il y a 1 h',
    content: 'Nouveau dessin pour la galerie familiale. J’ai hâte que tout le monde le voit.',
    imageLabel: 'Dessin coloré',
    likes: 31,
    comments: 8,
    isLiked: true,
  },
];
