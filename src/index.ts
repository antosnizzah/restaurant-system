import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'

import dotenv from 'dotenv/config';
import{ userRouter } from './users/user.router'
import { stateRouter } from './state/state.router';
import { AddressRouter } from './address/address.router';
import { CategoryRouter } from './category/category.router';
import { CityRouter } from './city/city.router';
import { CommentRouter } from './comment/comment.router';
import { DriverRouter } from './driver/driver.router';
import { MenuItemRouter } from './menu_item/menu_item.router';
import { OrderMenuItemRouter } from './order_menu/order_menu.router';
import { OrdersRouter } from './orders/orders.router';
import { OrderStatusRouter } from './order_status/order_status.router';
import { RestaurantRouter } from './restaurant/restaurant.router';
import { RestaurantOwnerRouter } from './restaurant_owner/restaurant_owner.router';
import { StatusCatalogRouter } from './status_catalog/status_catalog.router';
import { authRouter, authupdateRouter } from './auth/auth.router';
import assert from 'assert';


const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});


app.notFound((c) => {
  return c.text('route not found ', 404);
  
});
app.route("/", userRouter)
app.route("/", AddressRouter)
app.route("/", CategoryRouter)
app.route("/", CityRouter)
app.route("/", CommentRouter)
app.route("/", DriverRouter)
app.route("/", MenuItemRouter)
app.route("/", OrderMenuItemRouter)
app.route("/", OrdersRouter)
app.route("/", OrderStatusRouter)
app.route("/", RestaurantRouter)
app.route("/", RestaurantOwnerRouter)
app.route("/", stateRouter)
app.route("/", StatusCatalogRouter)
app.route("auth/", authRouter)
app.route("/", authupdateRouter)


assert(process.env.PORT, "PORT is not set in the .env file")

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})
console.log(`Server is running on port ${process.env.PORT} 📢`)


