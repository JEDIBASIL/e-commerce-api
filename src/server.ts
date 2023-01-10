import App from "./app";
import AdminRoute from "./routes/admin.route";
import ProductRoute from "./routes/product.route";
import UserRoute from "./routes/user.route";

const app = new App([
    new UserRoute(),
    new ProductRoute(),
    new AdminRoute(),
]);

app.listen()