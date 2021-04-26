import * as tslib_1 from "tslib";
import * as React from 'react';
import { connect } from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';
var PersistImpl = (function (_super) {
    tslib_1.__extends(PersistImpl, _super);
    function PersistImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveForm = debounce(function (data) {
            var isSubmitting = data.isSubmitting, filteredData = tslib_1.__rest(data, ["isSubmitting"]);
            if (_this.props.isSessionStorage) {
                window.sessionStorage.setItem(_this.props.name, JSON.stringify(filteredData));
            }
            else {
                window.localStorage.setItem(_this.props.name, JSON.stringify(filteredData));
            }
        }, _this.props.debounce);
        return _this;
    }
    PersistImpl.prototype.componentDidUpdate = function (prevProps) {
        if (!isEqual(prevProps.formik, this.props.formik)) {
            this.saveForm(this.props.formik);
        }
    };
    PersistImpl.prototype.componentDidMount = function () {
        var maybeState = this.props.isSessionStorage
            ? window.sessionStorage.getItem(this.props.name)
            : window.localStorage.getItem(this.props.name);
        if (maybeState && maybeState !== null) {
            this.props.formik.setFormikState(JSON.parse(maybeState));
        }
    };
    PersistImpl.prototype.render = function () {
        return null;
    };
    PersistImpl.defaultProps = {
        debounce: 300,
    };
    return PersistImpl;
}(React.Component));
export var Persist = connect(PersistImpl);
//# sourceMappingURL=formik-persist.js.map