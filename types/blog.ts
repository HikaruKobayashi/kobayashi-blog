export type Blog = {
  id: string;
  body: string;
  title: string;
  summary: string;
  tags: Tag[];
  image: { url: string };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type Tag = {
  id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
