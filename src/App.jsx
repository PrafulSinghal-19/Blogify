import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AllPost from "./pages/AllPost"
import PostPage from "./pages/PostPage"
import ErrorPage from "./pages/ErrorPage"
import CreatePage from "./pages/CreatePage"
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
          path: '/post/:id',
          element: <AuthLayout authenticated={false}> <PostPage /></AuthLayout>
        },
        {
          path: '/createBlog',
          element: <AuthLayout authenticated={false} > <CreatePage /> </AuthLayout>
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
