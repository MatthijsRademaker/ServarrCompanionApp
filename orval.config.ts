import { defineConfig } from 'orval';
export default defineConfig({
  readarr: {
    input: './openApiSpecs/readarr.openapi.json',
    output: {
      mock: true,
      clean: true,
      mode: 'split',
      baseUrl: 'http://localhost:3001',
      allParamsOptional: true,
      schemas: './thirdPartyApis/readarr/models',
      target: './thirdPartyApis/readarr/index.ts',
    },

    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
