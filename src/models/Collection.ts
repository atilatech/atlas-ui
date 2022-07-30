import { Content } from "./Content";

export class Collection {
    id?: string = "";
    title: string = "";
    slug?: string = "";
    contents?: Array<Content> = [];
    exported_collection_url?: string = "";
    imported_collection_url?: string = "";
}