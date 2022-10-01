import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'kobayashi-blog',
  apiKey: process.env.microCMS || "",
});