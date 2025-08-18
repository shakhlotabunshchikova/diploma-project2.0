export interface THeader {
    placeholder?: string;
    searchDisabled?: "default" | "focus" | "active" ;
    onSearch?: (query:string) => void;
 }
