import {
    CreateParams,
    DataProvider,
    DeleteOneParams,
    GetOneParams,
    UpdateParams,
    GetListParams,
} from "@refinedev/core";
import {createAuthenticatedRequest} from "../api";

const { projectSessionApi } = createAuthenticatedRequest();

export const projectSessionProvider: DataProvider = {
    getApiUrl(): string {
        return "";
    },
    getList: async ({ resource, pagination, filters, sort }: GetListParams) => {
        const page = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        const response = await projectSessionApi.getProjectSessions(page, pageSize);
        return {
            data: response.data,
            total: response.data.length,
        };
    },
    getOne: async ({ resource, id }: GetOneParams) => {
        const response = await projectSessionApi.getProjectSessionById(id.toString());
        return {
            data: response.data,
        };
    },
    create: async ({ resource, variables }: CreateParams) => {
        const id = variables?.id;

        const response = await projectSessionApi.crupdateProjectSessionById(id, variables);
        return {
            data: response.data,
        };
    },
    update: async ({ resource, id, variables }: UpdateParams) => {
        const response = await projectSessionApi.crupdateProjectSessionById(id.toString(), variables);
        return {
            data: response.data,
        };
    },
    deleteOne: async ({ resource, id }: DeleteOneParams) => {
        const response = "not implemented"
        return {
            data: response.data,
        };
    }
};