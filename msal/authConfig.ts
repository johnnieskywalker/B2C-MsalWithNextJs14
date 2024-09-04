import { Configuration, LogLevel } from "@azure/msal-browser";

// Browser check variables
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0;

// Ensure all required environment variables are defined
const requiredEnvVars = [
    'NEXT_PUBLIC_B2C_CLIENT_ID',
    'NEXT_PUBLIC_SIGNUP_POLICY_NAME',
    'NEXT_PUBLIC_EDIT_PROFILE_POLICY_NAME',
    'NEXT_PUBLIC_COMPANY_B2C_LOGIN_URL',
    'NEXT_PUBLIC_AUTHORITY_DOMAIN',
    'NEXT_PUBLIC_LOGIN_REQUEST_URL',
    'NEXT_PUBLIC_API_CONFIG_URL'
];

requiredEnvVars.forEach((envVar) => {
    const envValue = process.env[envVar as keyof NodeJS.ProcessEnv];
    if (envValue) {
        throw new Error(`Environment variable ${envVar} is not defined`);
    }
});

/**
 * Enter here the user flows and custom policies for your B2C application
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: process.env.NEXT_PUBLIC_SIGNUP_POLICY_NAME as string,
        editProfile: process.env.NEXT_PUBLIC_EDIT_PROFILE_POLICY_NAME as string
    },
    authorities: {
        signUpSignIn: {
            authority: `${process.env.NEXT_PUBLIC_COMPANY_B2C_LOGIN_URL}${process.env.NEXT_PUBLIC_SIGNUP_POLICY_NAME}`
        },
        editProfile: {
            authority: `${process.env.NEXT_PUBLIC_COMPANY_B2C_LOGIN_URL}${process.env.NEXT_PUBLIC_EDIT_PROFILE_POLICY_NAME}`
        }
    },
    authorityDomain: process.env.NEXT_PUBLIC_AUTHORITY_DOMAIN as string
};

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_B2C_CLIENT_ID as string,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: "/",
        postLogoutRedirectUri: "/",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    },
    system: {
        allowNativeBroker: false,
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
    scopes: [process.env.NEXT_PUBLIC_LOGIN_REQUEST_URL as string]
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 */
export const apiConfig = {
    scopes: [process.env.NEXT_PUBLIC_LOGIN_REQUEST_URL as string],
    uri: process.env.NEXT_PUBLIC_API_CONFIG_URL as string
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};