import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: './lib/**/*.ts',
  generates: {
    './generated-types/': {
      preset: 'client',
      plugins: [],
    },
    './pages/api/graphql/generated-types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-resolvers'],
      config: {
        contextType: './index#Context',
      },
    },
  },
}
export default config
