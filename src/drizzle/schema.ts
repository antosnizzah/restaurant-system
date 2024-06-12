import { pgTable, serial, text, decimal, varchar, time, integer,pgEnum, primaryKey, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Table } from 'drizzle-orm';

// Define Users table
export const UsersTable = pgTable("users", {
    id: serial("id").primaryKey().unique(),
    name: varchar("name").notNull(),
    contact_phone: varchar("contact_phone").notNull(),
    phone_verified: boolean("phone_verified").notNull(),
    email: varchar("email").notNull(),
    email_verified: boolean("email_verified").notNull(),
    confirmation_code: varchar("confirmation_code"),
    password: varchar("password").notNull(),
    // created_at: timestamp("created_at").notNull().defaultNow(),
    // updated_at: timestamp("updated_at").notNull(),
});
export const roleEnum = pgEnum("role",["user", "admin","Driver","super admin","RestaurantOwner"]);
export const AuthorizeUsersTable = pgTable("authorizeusers", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    password: varchar("password").notNull(),
    username: varchar("username").notNull(),
    role: roleEnum("role").default("user")
});


// Define Driver table
export const DriverTable = pgTable("driver", {
    id: serial("id").primaryKey().unique(),
    car_make: varchar("car_make").notNull(),
    car_model: varchar("car_model").notNull(),
    car_year: integer("car_year").notNull(),
    user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});

// Define Orders table
export const OrdersTable = pgTable("orders", {
    id: serial("id").primaryKey().unique(),
    restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }),
    estimated_delivery_time: time("estimated_delivery_time").notNull(),
    actual_delivery_time: time("actual_delivery_time"),
    delivery_address_id: integer("delivery_address_id").notNull().references(() => AddressTable.id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    driver_id: integer("driver_id").notNull().references(() => DriverTable.id, { onDelete: "cascade" }),
    price: decimal("price").notNull(),
    discount: decimal("discount").notNull(),
    final_price: decimal("final_price").notNull(),
    comment: varchar("comment"),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});

// Define OrderStatus table
export const OrderStatusTable = pgTable("order_status", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }),
    status_catalog_id: integer("status_catalog_id").notNull().references(() => StatusCatalogTable.id, { onDelete: "cascade" }),
    // created_at: timestamp("created_at").notNull(),
});

// Define StatusCatalog table
export const StatusCatalogTable = pgTable("status_catalog", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
});

// Define OrderMenuItem table
export const OrderMenuItemTable = pgTable("order_menu_item", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }),
    menu_item_id: integer("menu_item_id").notNull().references(() => MenuItemTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    item_price: decimal("item_price").notNull(),
    price: decimal("price").notNull(),
    comment: varchar("comment"),
});

// Define MenuItem table
export const MenuItemTable = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id),
    category_id: integer("category_id").notNull().references(() => CategoryTable.id, { onDelete: "cascade" }),
    description: varchar("description").notNull(),
    ingredients: varchar("ingredients").notNull(),
    price: decimal("price").notNull(),
    active: boolean("active").notNull(),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});

// Define Category table
export const CategoryTable = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
});

// Define Address table
export const AddressTable = pgTable("address", {
    id: serial("id").primaryKey(),
    street_address_1: varchar("street_address_1").notNull(),
    street_address_2: varchar("street_address_2"),
    zip_code: varchar("zip_code").notNull(),
    delivery_instructions: varchar("delivery_instructions"),
    user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    city_id: integer("city_id").notNull().references(() => CityTable.id, { onDelete: "cascade" }),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});

// Define Comment table
export const CommentTable = pgTable("comment", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    comment: varchar("comment").notNull(),
    comment_text: varchar("comment_text").notNull(),
    is_praise: boolean("is_praise").notNull(),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});



// Define City table
export const CityTable = pgTable("city", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    state_id: integer("state_id").notNull().references(() => StateTable.id, { onDelete: "cascade" }),
});

// Define State table
export const StateTable = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
});

// Define RestaurantOwner table
export const RestaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }),
    owner_id: integer("owner_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
});

// Define Restaurant table
export const RestaurantTable = pgTable("restaurant", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    street_address: varchar("street_address").notNull(),
    zip_code: varchar("zip_code").notNull(),
    city_id: integer("city_id").notNull().references(() => CityTable.id, { onDelete: "cascade" }),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});

// RELATIONSHIPS FROM THE ABOVE TABLES

export const driverRelations = relations(DriverTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [DriverTable.user_id],
        references: [UsersTable.id],
    }),
    orders: many(OrdersTable),
}));

export const orderRelations = relations(OrdersTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [OrdersTable.user_id],
        references: [UsersTable.id],
    }),
    driver: one(DriverTable, {
        fields: [OrdersTable.driver_id],
        references: [DriverTable.id],
    }),
    address: one(AddressTable, {
        fields: [OrdersTable.delivery_address_id],
        references: [AddressTable.id],
    }),
    restaurant: one(RestaurantTable, {
        fields: [OrdersTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
    orderStatus: many(OrderStatusTable),
    orderMenuItems: many(OrderMenuItemTable),
}));

export const orderStatusRelations = relations(OrderStatusTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [OrderStatusTable.order_id],
        references: [OrdersTable.id],
    }),
    statusCatalog: one(StatusCatalogTable, {
        fields: [OrderStatusTable.status_catalog_id],
        references: [StatusCatalogTable.id],
    }),
}));

export const orderMenuItemRelations = relations(OrderMenuItemTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [OrderMenuItemTable.order_id],
        references: [OrdersTable.id],
    }),
    menuItem: one(MenuItemTable, {
        fields: [OrderMenuItemTable.menu_item_id],
        references: [MenuItemTable.id],
    }),
}));

export const menuItemRelations = relations(MenuItemTable, ({ one, many }) => ({
    restaurant: one(RestaurantTable, {
        fields: [MenuItemTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
    category: one(CategoryTable, {
        fields: [MenuItemTable.category_id],
        references: [CategoryTable.id],
    }),
    orderMenuItems: many(OrderMenuItemTable),
}));

export const addressRelations = relations(AddressTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [AddressTable.user_id],
        references: [UsersTable.id],
    }),
    city: one(CityTable, {
        fields: [AddressTable.city_id],
        references: [CityTable.id],
    }),
    orders: many(OrdersTable),
}));

export const commentRelations = relations(CommentTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [CommentTable.order_id],
        references: [OrdersTable.id],
    }),
    user: one(UsersTable, {
        fields: [CommentTable.user_id],
        references: [UsersTable.id],
    }),
}));


export const cityRelations = relations(CityTable, ({ one, many }) => ({
    state: one(StateTable, {
        fields: [CityTable.state_id],
        references: [StateTable.id],
    }),
    addresses: many(AddressTable),
    restaurants: many(RestaurantTable),
}));

export const restaurantOwnerRelations = relations(RestaurantOwnerTable, ({ one }) => ({
    restaurant: one(RestaurantTable, {
        fields: [RestaurantOwnerTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
    owner: one(UsersTable, {
        fields: [RestaurantOwnerTable.owner_id],
        references: [UsersTable.id],
    }),
}));

export const restaurantRelations = relations(RestaurantTable, ({ one, many }) => ({
    city: one(CityTable, {
        fields: [RestaurantTable.city_id],
        references: [CityTable.id],
    }),
    orders: many(OrdersTable),
    menuItems: many(MenuItemTable),
    restaurantOwners: many(RestaurantOwnerTable),
}));
export const AuthorizeUsersRelations = relations(AuthorizeUsersTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [AuthorizeUsersTable.user_id],
        references: [UsersTable.id],
    }),
}));

// Exporting the types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

export type TIRestaurant = typeof RestaurantTable.$inferInsert;
export type TSRestaurant = typeof RestaurantTable.$inferSelect;

export type TICity = typeof CityTable.$inferInsert;
export type TSCity = typeof CityTable.$inferSelect;

export type TIComment = typeof CommentTable.$inferInsert;
export type TSComment = typeof CommentTable.$inferSelect;

export type TIOrder = typeof OrdersTable.$inferInsert;
export type TSOrder = typeof OrdersTable.$inferSelect;

export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;

export type TIStatusCatalog = typeof StatusCatalogTable.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalogTable.$inferSelect;

export type TIOrderMenuItem = typeof OrderMenuItemTable.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItemTable.$inferSelect;

export type TIMenuItem = typeof MenuItemTable.$inferInsert;
export type TSMenuItem = typeof MenuItemTable.$inferSelect;

export type TICategory = typeof CategoryTable.$inferInsert;
export type TSCategory = typeof CategoryTable.$inferSelect;

export type TIAddress = typeof AddressTable.$inferInsert;
export type TSAddress = typeof AddressTable.$inferSelect;

export type TIRestaurantOwner = typeof RestaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwnerTable.$inferSelect;

export type TIDriver = typeof DriverTable.$inferInsert;
export type TSDriver = typeof DriverTable.$inferSelect;

export type TIState = typeof StateTable.$inferInsert;
export type TSState = typeof StateTable.$inferSelect;

export type TIAuthorizeUsers = typeof AuthorizeUsersTable.$inferInsert;
export type TSAuthorizeUsers = typeof AuthorizeUsersTable.$inferSelect;