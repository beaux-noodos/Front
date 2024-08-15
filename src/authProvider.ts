import type { AuthProvider } from "@refinedev/core";
import { notification } from "antd";
import { disableAutoLogin, enableAutoLogin } from "./hooks";
import {createAuthenticatedRequest, securityApi} from "./provider/api";
import { v4 as uuidv4 } from 'uuid';

export const TOKEN_KEY = "refine-auth";
export const BEARER = "bearer";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await securityApi().signIn({ email, password });

      if (response.data && response.data.bearer) {
        localStorage.setItem(BEARER, response.data.bearer);
        localStorage.setItem(TOKEN_KEY, response.data.bearer);

        // get whoami
        const { authenticatedSecurityApi } = createAuthenticatedRequest();
        const userInfo = await authenticatedSecurityApi.whoami();
        localStorage.setItem('whoami', JSON.stringify(userInfo?.data));
        localStorage.setItem('user', JSON.stringify(userInfo?.data?.user));

        enableAutoLogin();
        return {
          success: true,
          redirectTo: '/',
        };
      } else {
        return {
          success: false,
          error: {
            message: 'Login failed',
            name: 'Invalid credentials',
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: 'Login failed',
          name: error.response.data.message,
        },
      };
    }
  },
  register: async ({ email, password }) => {
    const registrationToDomain = {
      id: uuidv4(),
      email: email,
      password: password,
      status: "ENABLED",
      role: "MANAGER",
    }

    try {
      await securityApi().signUp(registrationToDomain);
      return {
        success: true,
        redirectTo: '/login',
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  updatePassword: async () => {
    notification.success({
      message: "Updated Password",
      description: "Password updated successfully",
    });
    return {
      success: true,
    };
  },
  forgotPassword: async ({ email }) => {
    notification.success({
      message: "Reset Password",
      description: `Reset password link sent to "${email}"`,
    });
    return {
      success: true,
    };
  },
  logout: async () => {
    disableAutoLogin();
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    return {
      id: 1,
      name: "James Sullivan",
      avatar: "https://i.pravatar.cc/150",
    };
  },
};
