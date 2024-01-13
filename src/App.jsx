import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import AllPost from "./pages/AllPost"
import Post from "./pages/Post"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
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
          path: '/post/:postId',
          element: <Post />
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
