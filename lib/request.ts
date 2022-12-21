import request, { RequestDocument, Variables } from 'graphql-request'

export function req(document: RequestDocument, variables?: Variables) {
  return request('http://localhost:3000/api/graphql', document, variables)
}
