import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['lib/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/server/generated-types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-resolvers'],
      config: {
        contextType: '../../pages/api/graphql',
        fetcher: 'graphql-request',
      },
    },
    './graphql/client/': {
      preset: 'client',
      plugins: [],
    },
  },
}
export default config
