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
          path: './thirdPartyApis/mutators/readarr.ts',
          name: 'readarrMutator',
        },
      },
    },

    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
  lidarr: {
    input: './openApiSpecs/lidarr.openapi.json',
    output: {
      mock: false,
      clean: true,
      mode: 'split',
      allParamsOptional: true,
      client: 'vue-query',
      schemas: './thirdPartyApis/lidarr/models',
      target: './thirdPartyApis/lidarr/index.ts',
      override: {
        mutator: {
          path: './thirdPartyApis//mutators/lidarr.ts',
          name: 'lidarrMutator',
        },
      },
    },

    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
