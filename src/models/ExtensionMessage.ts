import { Scholarship } from "./Scholarship"

export interface LoadParentPageRequest {
    type: "LOAD_PARENT_PAGE";
    data?: {}
}

export interface LoadPageDataResponse {
    data: {
        scholarship: Scholarship,
    }
}

export interface ImportPageContentResponse {
    data: {
        content: {
            title: string,
            body: string,
        },
    }
}

export interface ImportPageContentRequest {
    type: "IMPORT_PAGE_CONTENT";
    data?: {}
}

export type RequestMessage = LoadParentPageRequest | ImportPageContentRequest
export type ResponseMessage = LoadPageDataResponse | ImportPageContentResponse
