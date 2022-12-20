import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: './lib/**/*.ts',
  generates: {
    './generated-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-resolvers',
        'typescript-react-query',
      ],
      config: {
        contextType: './pages/api/graphql/index#Context',
        fetcher: 'graphql-request',
      },
    },
  },
}
export default config
