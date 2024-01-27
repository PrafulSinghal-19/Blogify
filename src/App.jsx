import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AllPost from "./pages/AllPost"
import PostPage from "./pages/PostPage"
import ErrorPage from "./pages/ErrorPage"
import CreatePage from "./pages/CreatePage"
import UserInfo from "./pages/UserInfo"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <AllPost />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <SignUp />
        },
        {
          path: '/post/:id',
          element: <PostPage />
        },
        {
          path: '/createBlog',
          element: <CreatePage /> 
        },
        {
          path: '/userInfo',
          element: <UserInfo />
        }
      ]
    }
  ]
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
