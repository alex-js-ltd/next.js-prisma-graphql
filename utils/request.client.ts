import request, { RequestDocument, Variables } from 'graphql-request'

export function req(document: RequestDocument, variables?: Variables) {
  return request(`${window.location.origin}/api/graphql`, document, variables)
}
