import * as React from 'react';
export interface PersistProps {
  name: string;
  debounce?: number;
  isSessionStorage?: boolean;
}
export declare const Persist: React.ComponentType<PersistProps>;
