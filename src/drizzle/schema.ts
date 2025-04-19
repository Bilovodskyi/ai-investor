import {
    index,
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
    id: text("id").notNull().unique(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    tokens: integer("tokens"),
});

export const ListItemTable = pgTable(
    "listItem",
    {
        id: text("id").primaryKey().notNull(),
        userId: text("user_id").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        stockName: text("stock_name").notNull(),
        reasoning: text("reasoning").notNull(),
        signal: text("signal").notNull(),
        confidence: text("confidence").notNull(),
        calculationData: jsonb("report_data").notNull(),
        investor: text("investor"),
    },
    (table) => ({
        userIdCloseDateIndex: index("userIdCloseDateIndex").on(
            table.userId,
            table.createdAt
        ),
    })
);

export const TransactionsTable = pgTable("transactions", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    plan: text("plan").notNull(),
});
