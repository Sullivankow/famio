export type Story = {
  id: string;
  name: string;
  avatarColor: string;
  isNew?: boolean;
};

export type Post = {
  id: string;
  author: string;
  time: string;
  content: string;
  imageLabel: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
};
