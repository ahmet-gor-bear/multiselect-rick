export interface SearchResultObject {
    id: number;
    name: string;
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}
