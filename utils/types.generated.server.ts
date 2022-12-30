import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'pages/api/graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String'];
  coverImageUrl: Scalars['String'];
  id: Scalars['Int'];
  pageCount: Scalars['Int'];
  publisher: Scalars['String'];
  synopsis: Scalars['String'];
  title: Scalars['String'];
};

export type CreateListItemInput = {
  author: Scalars['String'];
  bookId: Scalars['Int'];
  coverImageUrl: Scalars['String'];
  pageCount: Scalars['Int'];
  publisher: Scalars['String'];
  synopsis: Scalars['String'];
  title: Scalars['String'];
};

export type ListItem = {
  __typename?: 'ListItem';
  author: Scalars['String'];
  bookId: Scalars['Int'];
  coverImageUrl: Scalars['String'];
  finishDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  pageCount: Scalars['Int'];
  publisher: Scalars['String'];
  rating?: Maybe<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  synopsis: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createListItem?: Maybe<Scalars['String']>;
  login?: Maybe<User>;
  logout?: Maybe<User>;
  register?: Maybe<User>;
  removeListItem?: Maybe<Scalars['String']>;
  updateListItem?: Maybe<Scalars['String']>;
};


export type MutationCreateListItemArgs = {
  listItemInput: CreateListItemInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveListItemArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateListItemArgs = {
  listItemInput: UpdateListItemInput;
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  listItems?: Maybe<Array<Maybe<ListItem>>>;
  user?: Maybe<User>;
};


export type QueryBooksArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type UpdateListItemInput = {
  author: Scalars['String'];
  bookId: Scalars['Int'];
  coverImageUrl: Scalars['String'];
  finishDate?: InputMaybe<Scalars['DateTime']>;
  pageCount: Scalars['Int'];
  publisher: Scalars['String'];
  rating?: InputMaybe<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  synopsis: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateListItemInput: CreateListItemInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ListItem: ResolverTypeWrapper<ListItem>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateListItemInput: UpdateListItemInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Book: Book;
  Boolean: Scalars['Boolean'];
  CreateListItemInput: CreateListItemInput;
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  ListItem: ListItem;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  UpdateListItemInput: UpdateListItemInput;
  User: User;
};

export type BookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  synopsis?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ListItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ListItem'] = ResolversParentTypes['ListItem']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  coverImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  finishDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  synopsis?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createListItem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateListItemArgs, 'listItemInput'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password'>>;
  removeListItem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveListItemArgs, 'id'>>;
  updateListItem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateListItemArgs, 'listItemInput'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType, Partial<QueryBooksArgs>>;
  listItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['ListItem']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Book?: BookResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  ListItem?: ListItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

