import * as React from 'react';
import { FormikProps, connect } from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';

export interface PersistProps {
  name: string;
  debounce?: number;
  persistFilter?: (data: FormikProps<any>) => any;
  loadFilter?: (data: any) => FormikProps<any>;

  isSessionStorage?: boolean;
}

class PersistImpl extends React.Component<
  PersistProps & { formik: FormikProps<any> },
  {}
> {
  static defaultProps = {
    debounce: 300,
    persistFilter: ({ isSubmitting, ...filteredData }: any) => filteredData,
    loadFilter: (loadedData: any) => loadedData,
  };

  saveForm = debounce((data: FormikProps<{}>) => {
    const filteredData = (this.props as any).persistFilter(data);
    if (this.props.isSessionStorage) {
      window.sessionStorage.setItem(
        this.props.name,
        JSON.stringify(filteredData)
      );
    } else {
      window.localStorage.setItem(
        this.props.name,
        JSON.stringify(filteredData)
      );
    }
  }, this.props.debounce);

  componentDidUpdate(prevProps: PersistProps & { formik: FormikProps<any> }) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik);
    }
  }

  componentDidMount() {
    const maybeState = this.props.isSessionStorage
      ? window.sessionStorage.getItem(this.props.name)
      : window.localStorage.getItem(this.props.name);
    if (maybeState && maybeState !== null) {
      this.props.formik.setFormikState((this.props as any).loadFilter(JSON.parse(maybeState)));
    }
  }

  render() {
    return null;
  }
}

export const Persist = connect<PersistProps, any>(PersistImpl);
