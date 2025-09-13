import { appRoutes } from "./app-routes";

const AppMenu = [
    {
        title: 'Products',
        path: appRoutes.products.list.create(),
    },
    {
        title: 'Categories',
        path: appRoutes.categories.create(),
    },
    {
        title: 'About us',
        path: appRoutes.about.create(),
    },

] as const;

export default AppMenu;