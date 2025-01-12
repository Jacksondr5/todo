import { pgTableCreator } from "drizzle-orm/pg-core";
import { env } from "~/env";

export const getPrefix = () => {
  switch (env.NODE_ENV) {
    case "production":
      return "prod";
    case "development":
      return "dev";
    default:
      return "test";
  }
};

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `todo_${getPrefix()}_${name}`,
);
