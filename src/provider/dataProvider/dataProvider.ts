import { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteOneParams } from "@refinedev/core";
import { userProvider } from "../userProvider/userProvider";
import { projectProvider } from "../projectProvider/projectProvider";
import {locationProvider} from "../locationProvider/locationProvider";
import {projectSessionProvider} from "../projectSessionProvider/projectSessionProvider";

const resourceMapping = {
    users: userProvider,
    projects: projectProvider,
    projectSessions: projectSessionProvider,
    locations: locationProvider,
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