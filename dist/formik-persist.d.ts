import * as React from 'react';
import { FormikProps } from 'formik';
export interface PersistProps {
    name: string;
    debounce?: number;
    persistFilter?: (data: FormikProps<any>) => any;
    loadFilter?: (data: any) => FormikProps<any>;
    isSessionStorage?: boolean;
}
export declare const Persist: React.ComponentClass<PersistProps, React.ComponentState> & {
    WrappedComponent: React.ComponentClass<PersistProps & {
        formik: import("formik/dist/types").FormikContext<any>;
    }, React.ComponentState>;
};
