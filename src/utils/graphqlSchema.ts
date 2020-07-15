import { gql } from "apollo-server-koa";
import {} from "./../resolvers/mutations/UserMutations";
import { UserQueries } from "./../resolvers/queries/UserQueries";
import { GeneralQueries } from "./../resolvers/queries/GeneralQueries";
import { WashQueries } from "./../resolvers/queries/WashQueries";
import {
  GeneralMutations,
  MapSettingsMutation,
  WashMutatuion,
  UserMutations,
} from "./../resolvers/mutations";

// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';

export const typeDefs = gql`
  scalar Date
  #User's
  type User {
    _id: ID
    role: String
    email: String
    login: String
    password: String
    phonenumber: Int
    comments: String
    region: Region
    settings: UserSettings
    created_at: Date
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  type UserSettings {
    mapSettings: MapSettings
  }
  #WashData
  type WashCoordinates {
    id: ID
    longitude: Float
    latitude: Float
  }
  type Region {
    id: ID
    name: String
    latitude: Float
    longitude: Float
    latitudeDelta: Float
    longitudeDelta: Float
    creator: User
  }
  #MapSettings
  type MapSettings {
    id: ID
    title: String
    subtitle: String
    selected: Boolean
    useInMapOption: Boolean
    archived: Boolean
    icon: ImageSettings
    creator: User
  }
  type ImageSettings {
    id: ID
    link: String
    size: String
    fileSize: Int
    upLoader: User
    storeRoute: String
  }
  # WashDescription
  type WashDescription {
    id: ID
    coordinatesId: String
    washname: String
    adress: String
    showonmap: Boolean
    uptime: String
    options: [MapSettings]
    social: WashDescriptionSocial
    postCount: Int
    region: Region
  }
  type WashDescriptionSocial {
    raiting: Int
    likesCount: WashDescriptionSocialLikesCount
    views: WashDescriptionSocialViews
  }
  type WashDescriptionSocialLikesCount {
    userId: String
    count: Int
  }
  type WashDescriptionSocialViews {
    userId: String
    count: Int
  }
  # WashDescription ________

  # ИНПУТЫ
  input UserInput {
    email: String!
    login: String!
    password: String!
    region: ID!
  }
  # Только для администратора
  input RegionInput {
    name: String
    latitude: Float!
    longitude: Float!
    latitudeDelta: Float!
    longitudeDelta: Float!
    creator: ID
  }
  input MapSettingsInput {
    title: String
    subtitle: String
    selected: Boolean
    useInMapOption: Boolean
    id: ID
    # icon: String
    archived: Boolean
  }
  input WashCoordinatesInput {
    longitude: Float!
    latitude: Float!
  }
  input WashDescriptionInput {
    adress: String
    coordinatesId: ID
    id: ID
    options: [ID]
    postCount: Int
    showonmap: Boolean
    uptime: String
    washname: String
  }
  input WashDescriptionForOptUpdateInput {
    washId: ID
    options: [MapSettingsInput]
  }

  type Query {
    signin(email: String!, password: String!): AuthData!
    getWashCoordinates: [WashCoordinates!]
    getAllWashDescriptions(coordinatesId: String): [WashDescription]
    me: User
    getRegions: [Region]
    getmapsettings: [MapSettings]
    # Только для администратора
    getAllUsers: [User]!
  }
  type Mutation {
    signup(userInput: UserInput): User
    # Только для администратора
    createRegion(regionInput: RegionInput): Region
    createWashCoordinates(
      washCoordinatesInput: WashCoordinatesInput
    ): WashCoordinates
    createWashDescription(
      washDescriptionInput: WashDescriptionInput
    ): WashDescription
    updateWashDescription(
      washDescriptionInput: WashDescriptionInput
    ): WashDescription

    updateWashDescriptionOpts(
      washDescriptionForOptUpdateInput: WashDescriptionForOptUpdateInput
    ): WashDescription

    createMapSettings(mapSettingsInput: MapSettingsInput): MapSettings
    updateMapSettings(mapSettingsInput: MapSettingsInput): MapSettings
  }
`;

export const resolvers = {
  Query: {
    ...UserQueries,
    ...GeneralQueries,
    ...WashQueries,
  },
  Mutation: {
    ...UserMutations,
    ...GeneralMutations,
    ...WashMutatuion,
    ...MapSettingsMutation,
  },
  // Subscription: {
  //   // ...messageSubscriptions
  // }
};
