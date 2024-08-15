import { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteOneParams } from "@refinedev/core";
import { userProvider } from "../userProvider/userProvider";
import { xxxxxxProvider } from "../xxxxxxProvider/xxxxxxProvider";
import {zzzzzzProvider} from "../zzzzzzProvider/zzzzzzProvider";
import {yyyyyyProvider} from "../yyyyyyProvider/yyyyyyProvider";

const resourceMapping = {
    users: userProvider,
    xxxxxxs: xxxxxxProvider,
    yyyyyys: yyyyyyProvider,
    zzzzzzs: zzzzzzProvider,
};

export const dataProvider: DataProvider = {
    getApiUrl(): string {
        return "";
    },

    getList: async (params: GetListParams) => {
        const { resource } = params;
        const provider = resourceMapping[resource];
        if (!provider) throw new Error(`No provider found for resource: ${resource}`);
        return provider.getList(params);
    },

    getOne: async (params: GetOneParams) => {
        const { resource } = params;
        const provider = resourceMapping[resource];
        if (!provider) throw new Error(`No provider found for resource: ${resource}`);
        return provider.getOne(params);
    },

    create: async (params: CreateParams) => {
        const { resource } = params;
        const provider = resourceMapping[resource];
        if (!provider) throw new Error(`No provider found for resource: ${resource}`);
        return provider.create(params);
    },

    update: async (params: UpdateParams) => {
        const { resource } = params;
        const provider = resourceMapping[resource];
        if (!provider) throw new Error(`No provider found for resource: ${resource}`);
        return provider.update(params);
    },

    deleteOne: async (params: DeleteOneParams) => {
        const { resource } = params;
        const provider = resourceMapping[resource];
        if (!provider) throw new Error(`No provider found for resource: ${resource}`);
        return provider.deleteOne(params);
    },
};