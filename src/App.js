import React, { useContext, lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Context from "./Context";

// Lazy load your pages
const Root = lazy(() => import("./Pages/Root"));
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Products = lazy(() => import("./Pages/Products"));
const Product = lazy(() => import("./Pages/Product"));
const Error = lazy(() => import("./Pages/Error"));
const Contact = lazy(() => import("./Pages/Contact"));
const Auth = lazy(() => import("./Components/Auth/Auth"));
const Profile = lazy(() => import("./Pages/Profile"));

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:productId", element: <Product /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
];

const router = createBrowserRouter(routerConfig);
const routerLogOut = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/logIn", element: <Auth /> },
      { path: "/products", element: <Auth /> },
      { path: "/products/:productId", element: <Auth /> },
      { path: "/contact", element: <Auth /> },
      { path: "/profile", element: <Auth /> },
    ],
  },
]);

function App() {
  const ctx = useContext(Context);
  const selectedRouter = ctx.isLogIn ? router : routerLogOut;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={selectedRouter} />
    </Suspense>
  );
}

export default App;
