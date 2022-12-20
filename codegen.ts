import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: './lib/**/*.ts',
  generates: {
    './generated-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'typescript-resolvers',
      ],
    },
  },

  config: {
    contextType: './pages/api/graphql/index#Context',
  },
}
export default config
