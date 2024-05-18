import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducer/auth";
import {Toaster} from 'react-hot-toast'
import { SocketProvider } from "./socket";

// Dynamic import, jb url hit hoga tabhi ye pages import honge
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));


const App = () => {

    const {user, loader} = useSelector(state => state.auth)

    

  const dispatch = useDispatch();

  useEffect(() => {

    axios
      .get(`${server}/api/v1/user/me`, {withCredentials: true})
      .then(({data}) => {
        dispatch(userExists(data.user))
      })
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
  <LayoutLoader />
) : (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route element={<SocketProvider>
                <ProtectedRoute user={user} />
            </SocketProvider>}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/groups" element={<Groups />} />
            </Route>

            <Route element={<ProtectedRoute user={!user} redirect={"/"} />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/chats" element={<ChatManagement />} />
            <Route path="/admin/messages" element={<MessageManagement />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
