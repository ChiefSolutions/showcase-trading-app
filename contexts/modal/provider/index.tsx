import { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { BottomSheet } from '@/components/kit';
import { modalRegistry } from '@/components/modals';
import { ModalComponentProps, ModalComponents, ModalName } from '@/components/modals/modals.types';

import { ModalContext } from '..';

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalConfig {
  Component: ModalComponents | undefined;
  visible: boolean;
  props: ModalComponentProps | undefined;
}

const defaultConfig = {
  Component: undefined,
  visible: false,
  props: undefined,
};
export const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ModalConfig>(defaultConfig);

  const show = useCallback((name: ModalName, props: ModalComponentProps) => {
    const Component = modalRegistry[name];

    if (Component) {
      setConfig({
        Component,
        visible: true,
        props,
      });
    }
  }, []);

  const onRequestClose = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  const close = useCallback(
    (cb?: () => void) => {
      onRequestClose();

      if (cb) {
        cb();
      }
    },
    [onRequestClose],
  );

  const { Component, visible, props } = config;

  const value = useMemo(() => {
    return {
      show,
      close,
    };
  }, [close, show]);

  return (
    <ModalContext.Provider value={value}>
      {
        <>
          {children}
          {visible && (
            <BottomSheet visible={visible} onRequestClose={onRequestClose}>
              {Component && <Component {...(props as ModalComponentProps)} close={onRequestClose} />}
            </BottomSheet>
          )}
        </>
      }
    </ModalContext.Provider>
  );
};
