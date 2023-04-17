declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.scss' {
  const styles: any;
  export = styles;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  const content: any;
  const viewBox: string;
  const width: string;
  const height: string;
  export default content;
  export default src;
}

declare namespace JSX {
  interface IntrinsicElements {
    target: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    Component: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare interface Window {
  [key: string]: any;
}

// 构建全局常量
declare const BUILD_DEV: string;
declare const BUILD_VERSION: string;
declare const BUILD_THEME: string;
