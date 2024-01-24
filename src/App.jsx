import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AllPost from "./pages/AllPost"
import Post from "./pages/Post"
import ErrorPage from "./pages/ErrorPage"
import PostPage from "./pages/PostPage"
import UserInfo from "./pages/UserInfo"
import AuthLayout from "./components/AuthLayout/AuthLayout"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <AuthLayout authenticated={false}> <AllPost /></AuthLayout>
        },
        {
          path: '/login',
          element: <AuthLayout> <Login /> </AuthLayout>
        },
        {
          path: '/signup',
          element: <AuthLayout> <SignUp /> </AuthLayout>
        },
        {
          path: '/post/:postId',
          element: <AuthLayout authenticated={false}> <Post /></AuthLayout>
        },
        {
          path: '/createBlog',
          element: <AuthLayout authenticated={false} > <PostPage /> </AuthLayout>
        },
        {
          path: '/userInfo',
          element: <AuthLayout authenticated={false}><UserInfo /></AuthLayout>
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
