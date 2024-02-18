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

export interface OptionComponentType  {
    item: SearchResultObject;
    searchParam?: string;
    isSelected:boolean;
    onSelect?:(item:SearchResultObject)=>void;
    focusController?:(result:boolean)=>void;
}

export interface SelectedBadgeComponentType  {
    item: SearchResultObject;
    onSelect?:(item:SearchResultObject)=>void;
    focusController?:(result:boolean)=>void;
}
