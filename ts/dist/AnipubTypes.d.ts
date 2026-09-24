export interface Anime {
    Genre: any;
    Name: string;
    exists?: boolean;
}
export interface AnimeLoadMatch {
    Genre?: any;
    Name?: string;
    exists?: boolean;
}
export interface AnimeCreateData {
    Genre: any;
    Name: string;
    exists?: boolean;
}
export interface Find {
    ep?: number;
    exist: boolean;
    id?: number;
}
export interface FindLoadMatch {
    id: string;
}
export interface FindbyGenre {
    currentPage?: number;
    id?: string;
    wholePage?: any[];
}
export interface FindbyGenreLoadMatch {
    id: string;
    page?: number;
}
export interface FullAnimeDetail {
    characters?: any[];
    id?: string;
    jikan?: Record<string, any>;
    local?: Record<string, any>;
}
export interface FullAnimeDetailLoadMatch {
    id: number;
}
export interface Info {
    Aired?: string;
    Cover?: string;
    DescripTion?: string;
    Duration?: string;
    Genres?: any[];
    ImagePath?: string;
    MALScore?: string;
    Name?: string;
    Premiered?: string;
    RatingsNum?: number;
    Status?: string;
    Studios?: string;
    Synonyms?: string;
    epCount?: number;
    finder?: string;
    id?: number;
}
export interface InfoLoadMatch {
    id: string;
}
export interface Rating {
    Aired?: string;
    Cover?: string;
    DescripTion?: string;
    Duration?: string;
    Genres?: any[];
    ImagePath?: string;
    MALScore?: string;
    Name?: string;
    Premiered?: string;
    RatingsNum?: number;
    Status?: string;
    Studios?: string;
    Synonyms?: string;
    epCount?: number;
    finder?: string;
    id?: number;
}
export interface RatingListMatch {
    page?: number;
}
export interface Search {
    Aired?: string;
    Cover?: string;
    DescripTion?: string;
    Duration?: string;
    Genres?: any[];
    ImagePath?: string;
    MALScore?: string;
    Name?: string;
    Premiered?: string;
    RatingsNum?: number;
    Status?: string;
    Studios?: string;
    Synonyms?: string;
    epCount?: number;
    finder?: string;
    id?: number;
}
export interface SearchLoadMatch {
    id: string;
}
export interface Searchall {
    currentPage?: number;
    id?: string;
    wholePage?: any[];
}
export interface SearchallLoadMatch {
    id: string;
    page?: number;
}
export interface Sort {
    Aired?: string;
    Cover?: string;
    DescripTion?: string;
    Duration?: string;
    Genres?: any[];
    ImagePath?: string;
    MALScore?: string;
    Name?: string;
    Premiered?: string;
    RatingsNum?: number;
    Status?: string;
    Studios?: string;
    Synonyms?: string;
    epCount?: number;
    finder?: string;
    id?: number;
}
export interface SortListMatch {
    genre?: string;
    name?: string;
    page?: number;
    ratefrom?: number;
    rateto?: number;
}
export interface StreamingDetail {
    ep?: any[];
    id?: string;
    link?: string;
    name?: string;
}
export interface StreamingDetailLoadMatch {
    id: number;
}
