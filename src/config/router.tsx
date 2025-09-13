import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { appRoutes } from "constants/app-routes";
import App from "App";
import PageErrorElement from "App/components/PageErrorElement";
import MainPage from "App/pages/Main";
import CategoriesPage from "App/pages/Categories";
import ProductsPage from "App/pages/Products";
import ProductDetailsPage from "App/pages/ProductDetails";
import CartPage from "App/pages/Cart";
import MyPage from "App/pages/My";
import AboutPage from "App/pages/About";

const routes: RouteObject[] = [
    {
        path: appRoutes.main.mask,
        element: <App />,
        children: [
            {
                errorElement: <PageErrorElement />,
                children: [
                    {
                        index: true,
                        element: <MainPage />,
                    },
                    {
                        path: appRoutes.categories.mask,
                        element: <CategoriesPage />,
                    },
                    {
                        path: appRoutes.products.list.mask,
                        element: <ProductsPage />,
                    },
                    {
                        path: appRoutes.products.details.mask,
                        element: <ProductDetailsPage />,
                    },
                    {
                        path: appRoutes.card.mask,
                        element: <CartPage />,
                    },
                    {
                        path: appRoutes.my.mask,
                        element: <MyPage />,
                    },
                    {
                        path: appRoutes.about.mask,
                        element: <AboutPage />
                    },
                    {
                        path: '*',
                        element: <Navigate to={appRoutes.main.mask} replace />
                    }
                ],
            },
        ],
    },
]

const router = createBrowserRouter(routes);

export default router;

