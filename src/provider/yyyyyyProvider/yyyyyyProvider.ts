import {
    CreateParams,
    DataProvider,
    DeleteOneParams,
    GetOneParams,
    UpdateParams,
    GetListParams,
} from "@refinedev/core";
import {createAuthenticatedRequest} from "../api";

const { yyyyyyApi } = createAuthenticatedRequest();

export const yyyyyyProvider: DataProvider = {
    getApiUrl(): string {
        return "";
    },
    getList: async ({ resource, pagination, filters, sort }: GetListParams) => {
        const page = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        const response = await yyyyyyApi.getYyyyyys(page, pageSize);
        return {
            data: response.data,
            total: response.data.length,
        };
    },
    getOne: async ({ resource, id }: GetOneParams) => {
        const response = await yyyyyyApi.getYyyyyyById(id.toString());
        return {
            data: response.data,
        };
    },
    create: async ({ resource, variables }: CreateParams) => {
        const id = variables?.id;

        const response = await yyyyyyApi.crupdateYyyyyyById(id, variables);
        return {
            data: response.data,
        };
    },
    update: async ({ resource, id, variables }: UpdateParams) => {
        const response = await yyyyyyApi.crupdateYyyyyyById(id.toString(), variables);
        return {
            data: response.data,
        };
    },
    deleteOne: async ({ resource, id }: DeleteOneParams) => {
        const response = await yyyyyyApi.deleteYyyyyyById(id.toString());
        return {
            data: response.data,
        };
    }
};