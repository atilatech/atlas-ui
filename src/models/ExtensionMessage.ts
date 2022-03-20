import { Scholarship } from "./Scholarship"
import { BlogContent } from "./BlogContent";

export interface LoadParentPageRequest {
    type: "LOAD_PARENT_PAGE";
    data?: {}
}

export interface LoadPageDataResponse {
    data: {
        scholarship: Scholarship,
    }
}

export interface ImportPageContentRequest {
    type: "IMPORT_PAGE_CONTENT";
    data?: {}
}

export interface ImportPageContentResponse {
    data: {
        blogContent: BlogContent,
    }
}

export type RequestMessage = LoadParentPageRequest | ImportPageContentRequest
export type ResponseMessage = LoadPageDataResponse | ImportPageContentResponse
