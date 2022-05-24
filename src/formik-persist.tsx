import * as React from 'react';
import { FormikProps, connect } from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';

export interface PersistProps {
  name: string;
  debounce?: number;
  persistFilter?: (data: FormikProps<any>) => Promise<any>;
  loadFilter?: (data: any) => Promise<FormikProps<any>>;

  isSessionStorage?: boolean;
}

const save = async (This: any, data: any) => {
  const filteredData = await (This.props as any).persistFilter(data);
  if (This.props.isSessionStorage) {
    return window.sessionStorage.setItem(
        This.props.name,
        JSON.stringify(filteredData)
    );
  } else {
    return window.localStorage.setItem(
        This.props.name,
        JSON.stringify(filteredData)
    );
  }
};

const load = async (This: any) => {
  const maybeState = This.props.isSessionStorage
      ? window.sessionStorage.getItem(This.props.name)
      : window.localStorage.getItem(This.props.name);
  if (maybeState && maybeState !== null) {
    return This.props.formik.setFormikState(
        await (This.props as any).loadFilter(JSON.parse(maybeState))
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
