import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// eslint-disable-next-line import/prefer-default-export
export const PermissionType = new GraphQLObjectType({
  name: 'Permission',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    target: { type: new GraphQLNonNull(GraphQLString) },
    permission: { type: new GraphQLNonNull(GraphQLString) },
  },
});
