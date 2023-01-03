import App from "./app";
import ProductRoute from "./routes/product.route";
import UserRoute from "./routes/user.route";

const app = new App([
    new UserRoute(),
    new ProductRoute()
]);

app.listen()