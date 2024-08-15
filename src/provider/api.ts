import {SecurityApi, Configuration, ZzzzzzingApi, UserApi, XxxxxxingApi, YyyyyyingApi, ChatbotApi} from "./gen";
import {BASE_PATH} from "./gen/base";
import {BEARER} from "../authProvider";

export const securityApi = () => new SecurityApi();

export const createAuthenticatedRequest = () => {
    const token = localStorage.getItem(BEARER);
    const config = new Configuration({
        basePath: BASE_PATH,
        accessToken: token ? `${token}` : undefined,
    });

    return {
        xxxxxxApi: new XxxxxxingApi(config),
        yyyyyyApi: new YyyyyyingApi(config),
        zzzzzzApi: new ZzzzzzingApi(config),
        userApi: new UserApi(config),
        chatbotApi: new ChatbotApi(config),
        authenticatedSecurityApi: new SecurityApi(config),
    };
};
