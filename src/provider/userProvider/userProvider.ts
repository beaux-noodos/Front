import {
    CreateParams,
    CreateResponse,
    DataProvider,
    DeleteOneParams,
    DeleteOneResponse,
    GetOneParams,
    GetOneResponse,
    UpdateParams,
    UpdateResponse,
    GetListResponse,
    GetListParams,
} from "@refinedev/core";
import {createAuthenticatedRequest} from "../api";

const { userApi } = createAuthenticatedRequest();

export const userProvider: DataProvider = {
    getApiUrl(): string {
        return "";
    },
    getList: async ({ resource, pagination, filters, sort }: GetListParams) => {
        const page = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        const response = await userApi.getUsers(page, pageSize);
        return {
            data: response.data,
            total: response.data.length,
        };
    },
    getOne: async ({ resource, id }: GetOneParams) => {
        const response = await userApi.getUserById(id.toString());
        return {
            data: response.data,
        };
    },
    create: async ({ resource, variables }: CreateParams) => {
        const response = await userApi.crupdateUserById("", variables);
        return {
            data: response.data,
        };
    },
    update: async ({ resource, id, variables }: UpdateParams) => {
        const response = await userApi.crupdateUserById(id.toString(), variables);
        return {
            data: response.data,
        };
    },
    deleteOne: async ({ resource, id }: DeleteOneParams) => {
        const response = await userApi.deleteUserById(id.toString());
        return {
            data: response.data,
        };
    }
};