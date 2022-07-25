/// <reference types="webpack/module" />
import React from "react";

const context: Record<string, any> = {};

const modules = require.context("./modules", true, /\.ts$/);

modules.keys().forEach((key: string) => {
  const moduleName = key.replace(/^\.\/(\w+)\.\w+$/, "$1");
  const module: any = modules(key);
  if (module) {
    context[moduleName] = new module.default();
  }
});

export const storesContext = React.createContext(context);

export function appStores() {
  return React.useContext(storesContext);
}
