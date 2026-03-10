// import React from 'react';
// type ContextItem = {
//   Provider: React.ComponentType<any>;
//   props?: Record<string, any>;
// };
// export const withContext =
//   (contexts: ContextItem[]) => (WrappedComponent: React.ComponentType<any>) => (props: any) =>
//     contexts.reduceRight(
//       (acc, { Provider, props: providerProps = {} }) => (
//         <Provider {...providerProps}>{acc}</Provider>
//       ),
//       <WrappedComponent {...props} />,
//     );
import React, { ComponentType } from 'react';

export type ContextWrapper = {
  Provider: React.ComponentType<any>;
  props?: Record<string, any>;
};

export const withContext = (wrappers: ContextWrapper[]) => {
  return <P extends object>(WrappedComponent: ComponentType<P>) => {
    const ComponentWithContext = (props: P) =>
      wrappers.reduceRight(
        (acc, { Provider, props: providerProps = {} }) => (
          <Provider {...providerProps}>{acc}</Provider>
        ),
        <WrappedComponent {...props} />,
      );

    ComponentWithContext.displayName = `withContext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithContext;
  };
};
