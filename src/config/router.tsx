import { appRoutes } from 'constants/app-routes';

import App from 'App';
import PageErrorElement from 'App/components/PageErrorElement';
import AboutPage from 'App/pages/About';
import CartPage from 'App/pages/Cart';
import CategoriesPage from 'App/pages/Categories';
import MainPage from 'App/pages/Main';
import MyPage from 'App/pages/My';
import ProductDetailsPage from 'App/pages/ProductDetails';
import ProductsPage from 'App/pages/Products';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

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
            element: <AboutPage />,
          },
          {
            path: '*',
            element: <Navigate to={appRoutes.main.mask} replace />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/e-commerce'
});

export default router;
