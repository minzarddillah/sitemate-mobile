export interface HeadlineTypes {
  data: NewsTypes[];
  loading: boolean;
};

export interface NewsTypes {
  author:      string;
  content:     string;
  description: string;
  publishedAt: Date;
  source:      Source;
  title:       string;
  url:         string;
  urlToImage:  string;
}

export interface Source {
  id:   null;
  name: string;
}