import * as React from 'react';
import { FormikProps } from 'formik';
export interface PersistProps {
  name: string;
  debounce?: number;
  persistFilter?: (data: FormikProps<{}>) => any;
  isSessionStorage?: boolean;
}
export declare const Persist: React.ComponentType<PersistProps>;
