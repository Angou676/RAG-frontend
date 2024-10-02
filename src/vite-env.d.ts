/// <reference types="vite/client" />

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

interface ProcessEnv {
  REACT_APP_GOOGLE_API_KEY: string;
  REACT_APP_SEARCH_ENGINE_ID: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ProcessEnv {}
}
