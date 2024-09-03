# Next.js App Router version >=13 with MSAL (Microsoft authentication library) Integration

This project integrates [Next.js](https://nextjs.org/) v14.0.4 with React v18 and the latest version of MSAL (Microsoft Authentication Library). It's bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and includes configurations for @azure/msal-browser: v3.6.0 and msal-react: v2.0.8. 

This boilerplate is designed to streamline the integration of Azure AD authentication in a server-rendered Next.js application, while ensuring the main layout remains succinct and organized.

![image](https://github.com/MazenSenih/MsalWithNextJs14/assets/24445348/b916fb15-ca9d-4084-b5a6-ef7b62eaf296) ![image](https://github.com/MazenSenih/MsalWithNextJs14/assets/24445348/aa1b91b3-4e32-4e0b-8e45-4634923a608e)

## Prerequisites
Before you begin, ensure you have Node.js installed, preferable version >=18.x.x

## Setting Up Your MSAL Backend and Configurations
To use Azure AD authentication, you must first set up your backend in Microsoft Azure.
And also to test the user claims and roles, you need to create a .env.local file in your nextjs project root directory and write the following line in it: 
```bash
process.env.NEXT_PUBLIC_USER_CLAIMS_ADMIN = '%replaceWithYourAdminRoleNameSpecifiedInAzureRegisteredAppRoles%'
//ex: process.env.NEXT_PUBLIC_USER_CLAIMS_ADMIN = 'APP_ADMIN'
```
### Steps to Configure Azure:
1. Navigate to [Microsoft Azure App Registration](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps).
2. Create a new registration for your web app.
3. Note down the following values:
   - Application (client) ID
   - Directory (tenant) ID
   - Managed application name in local directory
   - Your domain name (e.g., `xxxxx.onmicrosoft.com`)
4. Update these values in the MSAL authentication configuration file [msal/authConfig.js](msal/authConfig.js).

## Running the App
Use the following commands to run the app:

```bash
# Restoring dependencies
npm install

# Build the application
npm run build

# Start the development server
npm run dev

# Browse the application, 3000 is the default Next.js port if not used by another app.
http://localhost:3000/
```
## v0.2.0 Change log:
- Added User avatar component to handle user photo, or display initials avatar when no photo provided or the photo is blank/corrupted, and whether or not to show the basic user info like name, username.
- Added user claims handling, and a dedicated component [components/UserRolesContainer.tsx](components/UserRolesContainer.tsx) to render content based on user claims.
- Added a page to test Admin only user access.
- Added a page to test getting the user token generated based on your MSAL configuration, this can be very handy when talking to your custom APIs.
- All the above are tested and functioning correctly as expected.
- Added [msal/userHelper.ts](msal/userHelper.ts) to help with common user tasks. 

### Final words
I had the same struggle as you do do when I first started using MSAL for custom Azure hosted API, I hope this helps you starting your MSAL authentication faster, cleaner, and more straight forward.

Happy coding!💻

[Mazen Alsenih](https://mazensenih.com)

## B2C Fork
This is a B2C fork that was configured using this sample: [https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-react-samples/b2c-sample/src/authConfig.js](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-react-samples/b2c-sample/src/authConfig.js).

It needed a bit more tinkering, but hopefully, this will be useful. All the prerequisites need to be configured from this link: [https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant).
Note in this example some environment variables are used, so you need to create a `.env.local` file in the root of the project and add the following:

```bash
NEXT_PUBLIC_USER_CLAIMS_ADMIN=
NEXT_PUBLIC_SIGNUP_POLICY_NAME=
NEXT_PUBLIC_EDIT_PROFILE_POLICY_NAME=
NEXT_PUBLIC_COMPANY_B2C_LOGIN_URL=
NEXT_PUBLIC_AUTHORITY_DOMAIN=
NEXT_PUBLIC_LOGIN_REQUEST_URL=
NEXT_PUBLIC_API_CONFIG_URL=
NEXT_PUBLIC_B2C_CLIENT_ID=
```

Keep in mind that variables prefixed with `NEXT_PUBLIC_` are used in the frontend, and the rest are used in the backend. For better security consider moving some of variables to backend only. This is just a sample to get you started.