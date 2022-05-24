import * as React from 'react';
import { FormikProps, connect } from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';
import localforage from 'localforage';
export interface PersistProps {
  name: string;
  debounce?: number;
  persistFilter?: (data: FormikProps<any>) => Promise<any>;
  loadFilter?: (data: any) => Promise<FormikProps<any>>;
  localForageConfig?: any;
  isSessionStorage?: boolean;
  isLocalStorage?: boolean;
}

const save = async (This: any, data: any) => {
  const filteredData = await (This.props as any).persistFilter(data);
  if (This.props.isSessionStorage === true) {
    return window.sessionStorage.setItem(
        This.props.name,
        JSON.stringify(filteredData)
    );
  } else if (This.props.isLocalStorage === true) {
    return window.localStorage.setItem(
        This.props.name,
        JSON.stringify(filteredData)
    );
  } else {
    for (const key of Object.keys(filteredData)) {
      const value = filteredData[key];
      if (typeof value === 'function') {
        delete filteredData[key];
      }
    }
    return localforage.setItem(
        This.props.name,
        filteredData
    );
  }
};
const loadState = async (This: any) => {
  if (This.props.isSessionStorage === true) {
    const l = window.sessionStorage.getItem(This.props.name);
    if (l) {
      return JSON.parse(l);
    }
  } else if (This.props.isLocalStorage === true) {
    const l = window.localStorage.getItem(This.props.name);
    if (l) {
      return JSON.parse(l);
    }
  } else {
    return localforage.getItem(This.props.name);
  }
  return null;
};
const load = async (This: any) => {
  const maybeState = await loadState(This);
  if (maybeState && maybeState !== null) {
    return This.props.formik.setFormikState(
        await (This.props as any).loadFilter(maybeState)
    );
  }
};

class PersistImpl extends React.Component<
  PersistProps & { formik: FormikProps<any> },
  {}
> {
  static defaultProps = {
    debounce: 300,
    persistFilter: ({ isSubmitting, ...filteredData }: any) => filteredData,
    loadFilter: (loadedData: any) => loadedData,
  };
  saveForm = debounce((data: FormikProps<any>) => {
      save(this, data);
  }, this.props.debounce);

  public PersistImpl(props: any) {
    if (!(props.isSessionStorage || props.isLocalStorage)) {
      localforage.config({
        driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
        name: 'formik-persist',
        version: 1.0,
        storeName: 'formik_persist', // Should be alphanumeric, with underscores.
        description: 'persist formik values',
        ...(props.localForageConfig || {})
      });
    }
  }
  componentDidUpdate(prevProps: PersistProps & { formik: FormikProps<any> }) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik);
    }
  }

  componentDidMount() {
    load(this);
  }

  render() {
    return null;
  }
}

export const Persist = connect<PersistProps, any>(PersistImpl);
