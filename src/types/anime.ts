export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer?: {
    url: string;
    embed_url: string;
  };
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type: string;
  source: string;
  episodes?: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
  };
  duration: string;
  rating: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis?: string;
  background?: string;
  season?: string;
  year?: number;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  licensors: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  explicit_genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  themes: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  demographics: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
}

export interface AnimeSearchResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeDetailResponse {
  data: Anime;
}


