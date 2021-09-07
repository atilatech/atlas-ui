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

export type RequestMessage = LoadParentPageRequest
export type ResponseMessage = LoadPageDataResponse