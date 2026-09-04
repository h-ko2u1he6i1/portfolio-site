export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  longDescription: string;
  image: string;
  role: string;
  externalLink?: string;
  detailImage?: string;
  detailImageSp?: string;
  movie?: string;
  movieSp?: string;
}
