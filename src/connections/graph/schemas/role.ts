import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const RolePermissionBodyType = new GraphQLObjectType({
  name: 'RolePermissionBody',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    permissions: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    level: { type: new GraphQLNonNull(GraphQLInt) },
    inheritance: { type: new GraphQLNonNull(GraphQLBoolean) },
    permissions: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RolePermissionBodyType))),
    },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    },
    subId: { type: new GraphQLNonNull(GraphQLString) },
  },
});
