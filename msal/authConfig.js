import { LogLevel, ProtocolMode } from "@azure/msal-browser";

// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: process.env.NEXT_PUBLIC_SIGNUP_POLICY_NAME,
        editProfile: process.env.NEXT_PUBLIC_EDIT_PROFILE_POLICY_NAME
    },
    // Example "https://company.b2clogin.com/company.onmicrosoft.com/B2C_1_SignupSignin1"
    authorities: {
        signUpSignIn: {
            authority: `${process.env.NEXT_PUBLIC_COMPANY_B2C_LOGIN_URL}${process.env.NEXT_PUBLIC_SIGNUP_POLICY_NAME}`
        },
        editProfile: {
            authority: `${process.env.NEXT_PUBLIC_COMPANY_B2C_LOGIN_URL}${process.env.NEXT_PUBLIC_EDIT_PROFILE_POLICY_NAME}`
        }
    },
    // Example if you are not using custom "company.b2clogin.com"
    // NOTE it's not the one with omnimicrosoft.com suffix
    authorityDomain: process.env.NEXT_PUBLIC_AUTHORITY_DOMAIN
}

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_B2C_CLIENT_ID,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        // This should be default for b2c, adding in case it is needed
        // skipAuthorityMetadataCache: true,
        // protocolMode: ProtocolMode.OIDC
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    },
    system: {
        LogLevel: LogLevel.Verbose,
        allowNativeBroker: false, // Disables WAM Broker
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
    scopes: [process.env.NEXT_PUBLIC_LOGIN_REQUEST_URL]
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig = {
    scopes: [process.env.NEXT_PUBLIC_LOGIN_REQUEST_URL],
    uri: process.env.NEXT_PUBLIC_API_CONFIG_URL
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};