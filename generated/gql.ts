/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout {\n      id\n      email\n    }\n  }\n": types.LogoutDocument,
    "\n  query user {\n    user {\n      id\n      email\n    }\n  }\n": types.UserDocument,
    "\n  query books($query: String) {\n    books(query: $query) {\n      id\n      author\n      coverImageUrl\n      pageCount\n      publisher\n      synopsis\n      title\n    }\n  }\n": types.BooksDocument,
    "\n  query book($bookId: Int) {\n    book(id: $bookId) {\n      id\n      title\n      author\n      coverImageUrl\n      publisher\n      synopsis\n      pageCount\n    }\n  }\n": types.BookDocument,
    "\n  mutation createListItem($listItemInput: CreateListItemInput!) {\n    createListItem(listItemInput: $listItemInput)\n  }\n": types.CreateListItemDocument,
    "\n  mutation updateListItem($listItemInput: UpdateListItemInput!) {\n    updateListItem(listItemInput: $listItemInput)\n  }\n": types.UpdateListItemDocument,
    "\n  mutation removeListItem($removeListItemId: Int!) {\n    removeListItem(id: $removeListItemId)\n  }\n": types.RemoveListItemDocument,
    "\n  query listItems {\n    listItems {\n      bookId\n      id\n      title\n      author\n      coverImageUrl\n      publisher\n      synopsis\n      pageCount\n      startDate\n      finishDate\n      rating\n      notes\n    }\n  }\n": types.ListItemsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logout {\n    logout {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query user {\n    user {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query user {\n    user {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query books($query: String) {\n    books(query: $query) {\n      id\n      author\n      coverImageUrl\n      pageCount\n      publisher\n      synopsis\n      title\n    }\n  }\n"): (typeof documents)["\n  query books($query: String) {\n    books(query: $query) {\n      id\n      author\n      coverImageUrl\n      pageCount\n      publisher\n      synopsis\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query book($bookId: Int) {\n    book(id: $bookId) {\n      id\n      title\n      author\n      coverImageUrl\n      publisher\n      synopsis\n      pageCount\n    }\n  }\n"): (typeof documents)["\n  query book($bookId: Int) {\n    book(id: $bookId) {\n      id\n      title\n      author\n      coverImageUrl\n      publisher\n      synopsis\n      pageCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createListItem($listItemInput: CreateListItemInput!) {\n    createListItem(listItemInput: $listItemInput)\n  }\n"): (typeof documents)["\n  mutation createListItem($listItemInput: CreateListItemInput!) {\n    createListItem(listItemInput: $listItemInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateListItem($listItemInput: UpdateListItemInput!) {\n    updateListItem(listItemInput: $listItemInput)\n  }\n"): (typeof documents)["\n  mutation updateListItem($listItemInput: UpdateListItemInput!) {\n    updateListItem(listItemInput: $listItemInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeListItem($removeListItemId: Int!) {\n    removeListItem(id: $removeListItemId)\n  }\n"): (typeof documents)["\n  mutation removeListItem($removeListItemId: Int!) {\n    removeListItem(id: $removeListItemId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listItems {\n    listItems {\n      bookId\n      id\n      title\n      author\n      coverImageUrl\n      publisher\n      synopsis\n      pageCount\n      startDate\n      finishDate\n      rating\n      notes\n    }\n  }\n"): (typeof documents)["\n  query listItems {\n    listItems {\n      bookId\n      id\n      title\n      author\n      coverImageUrl\n      publisher\n      synopsis\n      pageCount\n      startDate\n      finishDate\n      rating\n      notes\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;