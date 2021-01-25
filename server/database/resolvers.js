const resolvers = {
    Query: {
      users: () => users,
      //campaigns: () => campaigns,
      //maps: () => maps,
      //characters: () => characters,
    }
};

module.exports = resolvers;