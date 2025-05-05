export interface BannerItem {
  poster_path?: string;
  backdrop_path?: string;
  title?: string;
  name?: string;
  overview?: string;
  vote_average?: string;
  popularity?: string;
  release_date: string;
  media_type?: string;
  id: string;
}

export interface DetailsType extends BannerItem {
  tagline: string;
  vote_count: number;
  runtime: string;
  status: string;
  revenue: number;
  crew: [{ name: string; job: string }];
  cast: [{ profile_path: string; name: string }];
  number_of_episodes: string;
}
