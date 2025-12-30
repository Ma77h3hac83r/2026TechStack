# 2026 Tech Stack

A modern web development stack showcasing **Astro**, **Tailwind CSS**, **Biome**, and **Firebase** - a powerful combination for building fast, scalable, and maintainable web applications.

## Tech Stack

- **[Astro](https://astro.build/)** - The web framework for content-driven websites. Build faster with less client-side JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapidly building custom user interfaces.
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter for JavaScript, TypeScript, and more. All-in-one toolchain.
- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service platform for building web and mobile apps with authentication, database, and more.

## Prerequisites

- Node.js 18+ and npm
- Firebase account (for Firebase features)

## Setup Instructions

### 1. Astro Setup

```bash
npm create astro@latest project-name
mv ./project-name/* .
```

### 2. Add Tailwind CSS

Install Tailwind CSS:

```bash
npm install tailwindcss @tailwindcss/vite
```

Add to `astro.config.mjs`:

```mjs
import tailwindcss from "@tailwindcss/vite";
```

```mjs
vite {
  plugins: [tailwindcss()],
},
```

Create `/src/styles/global.css` and add:

```css
@import "tailwindcss";
```

### 3. Biome Setup

```bash
npm i -D -E @biomejs/biome
npx @biomejs/biome init
```

### 4. Firebase Setup

1. Create app at [Firebase Console](https://console.firebase.google.com/)
2. Enable Gemini (optional)
3. Enable Google Analytics (optional)

4. Create `.env` file with the following:

```env
# Client-side Firebase config
PUBLIC_FIREBASE_API_KEY=PUBLIC_FIREBASE_API_KEY
PUBLIC_FIREBASE_AUTH_DOMAIN=PUBLIC_FIREBASE_AUTH_DOMAIN
PUBLIC_FIREBASE_PROJECT_ID=PUBLIC_FIREBASE_PROJECT_ID
PUBLIC_FIREBASE_STORAGE_BUCKET=PUBLIC_FIREBASE_STORAGE_BUCKET
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=PUBLIC_FIREBASE_MESSAGING_SENDER_ID
PUBLIC_FIREBASE_APP_ID=PUBLIC_FIREBASE_APP_ID

# Server-side Firebase Admin config
FIREBASE_PROJECT_ID=PROJECT_ID
FIREBASE_PRIVATE_KEY_ID=PRIVATE_KEY_ID
FIREBASE_PRIVATE_KEY="PRIVATE_KEY"
FIREBASE_CLIENT_EMAIL=CLIENT_EMAIL
FIREBASE_CLIENT_ID=CLIENT_ID
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=CLIENT_CERT_URL
```

5. Go to Project Settings and look for the web `</>` icon.
6. Name your application and uncheck Hosting.
7. Copy the details from the generated file to your `.env`.

8. Install Firebase packages:

```bash
npm install firebase firebase-admin
```

9. For environment variable intellisense integration, create `/src/env.d.ts` with the following:

```ts
interface ImportMetaEnv {
  // Client-side Firebase config (PUBLIC_ prefix makes them available in browser)
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly PUBLIC_FIREBASE_APP_ID: string;
  // Server-side Firebase Admin config (no PUBLIC_ prefix - server-only)
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_PRIVATE_KEY_ID: string;
  readonly FIREBASE_PRIVATE_KEY: string;
  readonly FIREBASE_CLIENT_EMAIL: string;
  readonly FIREBASE_CLIENT_ID: string;
  readonly FIREBASE_AUTH_URI: string;
  readonly FIREBASE_TOKEN_URI: string;
  readonly FIREBASE_AUTH_CERT_URL: string;
  readonly FIREBASE_CLIENT_CERT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

10. Create `/src/firebase/client.ts`:

```ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
```

11. Create `/src/firebase/server.ts`:

```ts
import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

const initApp = () => {
  if (import.meta.env.PROD) {
    console.info('PROD env detected. Using default service account.')
    // Use default config in firebase functions. Should be already injected in the server by Firebase.
    return initializeApp()
  }
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
```

12. Go to Firebase Project Settings -> Service Accounts.
13. Generate a new private key and save as `serviceAccount.json`.
14. Create `/.firebase` and place the `serviceAccount.json` in the folder.
15. Update `.env` with details from `serviceAccount.json`.

## Available Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
