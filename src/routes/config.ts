import { ReactNode } from "react";

export type RouteType = {
  element?: ReactNode,
  state: string,
  index?: boolean,
  path?: string,
  login?: boolean
  child?: RouteType[],
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};