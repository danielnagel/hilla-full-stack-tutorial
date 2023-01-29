import type { Route } from '@vaadin/router';
import './views/list/list-view';
import "./main-layout";

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'list-view',
    icon: 'la la-file',
    title: 'Contacts',
  },
  {
    path: "dashboard",
    component: "dashboard-view",
    title: "Dashboard",
    action: async () => {
      await import("./views/dashboard/dashboard-view");
    }
  }
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: "main-layout",
    children: views
  }
];
