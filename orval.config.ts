import { defineConfig } from 'orval';
export default defineConfig({
  readarr: {
    input: './openApiSpecs/readarr.openapi.json',
    output: {
      mock: false,
      clean: true,
      mode: 'split',
      allParamsOptional: true,
      client: 'vue-query',
      schemas: './thirdPartyApis/readarr/models',
      target: './thirdPartyApis/readarr/index.ts',
      override: {
        mutator: {
          path: './thirdPartyApis/mutator.ts',
          name: 'customInstance',
        },
      },
    },

    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
