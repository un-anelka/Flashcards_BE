import {
  extendType,
  nonNull,
  objectType,
  stringArg,
  intArg,
  inputObjectType,
  enumType,
  arg,
} from "nexus";

export const Link = objectType({
  name: "SOSO",
  definition(t) {
    t.nonNull.string("id"),
      t.nonNull.string("description"),
      t.nonNull.string("url");
    t.field("postedBy", {
      type: "User",
      resolve(parent, _args, context) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      },
    });
  },
});
export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "SOSO",
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: stringArg(),
      },
      resolve(parent, args, context) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
              ],
            }
          : {};
        return context.prisma.link.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
        });
      },
    });
  },
});

export const MutationTut = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("Create_Link", {
      type: "SOSO",
      args: { url: nonNull(stringArg()), description: nonNull(stringArg()) },
      //@ts-ignore
      resolve(parent, args, context, info) {
        const { url, description } = args;

        const newLink = context.prisma.link.create({
          data: {
            description,
            url,
            // postedBy: { connect: { id: userId } },
          },
        });
        return newLink;
      },
    });
    t.nonNull.field("Update_Link", {
      type: "SOSO",
      args: { id: stringArg(), url: stringArg(), description: stringArg() },
      //@ts-ignore
      resolve(_parent, args, context) {
        const { id, url, description } = args;
        const updateLink = context.prisma.link.update({
          where: { id },
          data: {
            description,
            url,
          },
        });
        return updateLink;
      },
    });
    t.field("Delete_Link", {
      type: "SOSO",
      args: { id: stringArg() },
      //@ts-ignore
      async resolve(_parent, args, context) {
        const { id } = args;
        await context.prisma.link.delete({
          where: { id },
        });

        return;
      },
    });
  },
});
