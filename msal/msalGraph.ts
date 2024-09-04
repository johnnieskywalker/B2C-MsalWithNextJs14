import { loginRequest, graphConfig } from "@/msal/authConfig";
import { msalInstance } from '@/msal/msal';
import { AccountInfo, SilentRequest } from "@azure/msal-browser";

export async function getUserPhotoAvatar(): Promise<string> {
    const instance = msalInstance;
    const account: AccountInfo | null = instance.getActiveAccount();

    if (!account) {
        throw new Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const tokenRequest: SilentRequest = {
        ...loginRequest,
        account: account,
    };

    const tokenResponse = await instance.acquireTokenSilent(tokenRequest);

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${tokenResponse.accessToken}`);

    const photoEndpoint = `${graphConfig.graphMeEndpoint}/photo/$value`;

    const options: RequestInit = {
        method: "GET",
        headers: headers,
    };

    return fetch(photoEndpoint, options)
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            return url;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}