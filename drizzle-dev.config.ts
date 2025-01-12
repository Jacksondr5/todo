import { type Config } from "drizzle-kit";
import drizzleProdConfig from "drizzle-prod.config";

export default {
  ...drizzleProdConfig,
  tablesFilter: [`todo_dev*`],
} satisfies Config;
