import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import usersRouter from "./routers/userRouter";
import {localsMiddleware} from "./middlewares";

//create server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); 
app.use(logger);
app.use(express.urlencoded({extended:true}));

// session. 사이트로 들어오는 모두를 기억. router 전에 작성!
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, // session을 수정할때만 db에 전송
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", usersRouter);

export default app;