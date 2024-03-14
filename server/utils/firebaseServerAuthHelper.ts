/* eslint-disable n/prefer-global/process */

import { cert, getApps, initializeApp } from "firebase-admin/app";

const firebaseServerConfig = {
  type: "service_account",
  project_id: "newsblog-bbdd6",
  private_key_id: "05305f35cd7eb2be5a3f9ed4b0b0c735b32feb8b",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGBhASSycEHKBQ\nmr7qfmUo21DCNglSK6LiRjgM+COqBbWmfUvpvmZF3MIX48SNdF7ocLHe87NZBzFZ\nQnmv277ZHwQoj09vEnxLfT1vs2dDBkZXNRM+8Gyq+1SXp8BZmwY+vsg2XN7vKMOZ\nRc9E1MT21FUjxSmdmDXv55b6A+jekNPfcJJ9WYum2N9AtlDKRVIIb73sgYOWxIyk\nxGF/rbKYtnW9cvEoKUf1uPpTdZT4lLjjd5My1o90jk4xyNa564+g2A49YKiwvbqC\n0Nw8VFNacYl/MD8rQlSQEJaxAIj1bYj1qWJcKt6HgVEVHmCfTZvnyzGd3KoFT8o2\nMf54BNE5AgMBAAECggEABLLcB3cX8Q5ioaIxjmjBd6EpyIxVypWYlJQA3F8eurgB\nqdzpikPdwBTsJRSr0zhttq6GRe/hGec+Cd82LUPo6O5GH++m/Wl1bUKGplBRNONH\nLYAOQBoEouAtgmvoUdsueeddSRu8hw7stZ97es36pRAZbt/mUopsGZ066GoWomgU\ni/pzFg5JE7d+DUFCCySRY3NlJFPohOuQys052RO7o1WSjjF98Gw9LfyW0USm3f8c\n21Heyiswt4m+Ot9Wh6QUifWMVaoz+Yvi6ulQwVlrJuwnQVUqRf/noXcqgLj+2N0F\n1x7KNE6k5FU1M+OsYaEbVWw/JYMooy+GGeor2tI69QKBgQDn5/iOTsR9R2arayyF\n3wmPxV7Nl35SGRGlwMaXwDYjpab7qMi0LG4EQRLDNZaVH5RNrCi2gf/FrxZTiaNb\nHre4/pju0a4tR/vb781D4i/TOKIfvFydn4JgE40/Lw+gYlMGcsfmUF0mPQXr9tAV\npCiEZYKc4EbBkAnlohsgfDVHbQKBgQDamOrGJGWKPHwcHs+q/3r8chG9Chd1itJq\n1ap/BBPeBjJFpSPoO2MoJKpMHQdAq0OPgJQC3n4oDj1NyBjfSCn9Kn4G5c0xtOtP\nusYUjQyFzgxT+ajvPxZrVYF2S1ftcjEWZzgGGd79Oz764unAxyiFqa521cBsJpaz\ngXM375kVfQKBgEs6yTsA+mTZoMjC/7J95BArqtFu75+aWks2+jWIOQffWQgSfOlV\n8GqY4YlJ/QtrLyTzUFHEYkCyx79ZyxBoKplsnhf7FVHDJET4ydHXskQG/zDkXfcU\nI6sfLJbuoVcaDmztF0PzlgQtj5o4etBKbIpmk7RoXQu1ukAwEjS7ll0RAoGAK69N\nk8VoSWTnBJOfurONt29wXg/rOkFA5brHdNSyx7cDSunCsEFWAoq5Qba3YVQYj1AJ\nxD0Ehyq5U5b+aXi5c2+Pef9or1tRf0B7H1ZEv2S7D/kfqpg3+cE/uw05iCk+6BQ+\nnPGEn6S8ZFT+k9j5HyUWyYbUCoj3qu3ewbnvJN0CgYBVDj8NsmsSjf6k/cHh+tny\nS6ZhGVYmt0RiX4Tm2bc4uJZzOh7LCjNyC7I8ueA7HY6Fv9a+VqT1l/Aoim181czw\nyzu1wtwgRyREU42695CBB/LLJa8HvBWJ+74WKfT2DvIitgaq7pzLkJNa2eFpyjlh\nOZ2+Q3dssQJkqTeTAMC6Qg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-jetwg@newsblog-bbdd6.iam.gserviceaccount.com",
  client_id: "106994562620751751722",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jetwg%40newsblog-bbdd6.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export function firebaseServerAuthHelper() {
  // const runtimeConfig = useRuntimeConfig();

  if (process.env.FIREBASE_ADMIN_API) {
    const config = JSON.parse(process.env.FIREBASE_ADMIN_API);
    if (getApps().length === 0) {
      console.log("Init Server App");

      initializeApp({
        // credential: cert(JSON.stringify(firebaseServerConfig)),
        credential: cert(config),
      });

      console.log("Server App after init getApps().length ===", getApps().length);
    }
  }
}
