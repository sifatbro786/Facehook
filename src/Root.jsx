import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";

export default function Root() {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route element={<Home />} path="/" exact />
                    <Route element={<Profile />} path="/me" />
                </Route>

                <Route element={<Login />} path="/login" />
                <Route element={<Registration />} path="/register" />
                <Route element={<NotFound />} path="*" />
            </Routes>
        </>
    );
}
