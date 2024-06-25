"use strict";

exports.__esModule = true;
exports.useFilter = void 0;
var _core = require("@superset-ui/core");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var useFilter = _ref => {
  var {
    filters,
    emitCrossFilters,
    setDataMask
  } = _ref;
  var isActiveFilterValue = (0, _react.useCallback)(function isActiveFilterValue(key, val) {
    var _filters$key2;
    if (Array.isArray(val)) {
      return !!filters && val.some(v => {
        var _filters$key;
        return (_filters$key = filters[key]) == null ? void 0 : _filters$key.includes(v);
      });
    }
    return !!filters && ((_filters$key2 = filters[key]) == null ? void 0 : _filters$key2.includes(val));
  }, [filters]);
  var getCrossFilterDataMask = (key, value) => {
    var updatedFilters = _extends({}, filters || {});
    if (filters && isActiveFilterValue(key, value)) {
      updatedFilters = {};
    } else {
      updatedFilters = {
        [key]: Array.isArray(value) ? value : [value]
      };
    }
    if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
      delete updatedFilters[key];
    }
    var groupBy = Object.keys(updatedFilters);
    var groupByValues = Object.values(updatedFilters);
    var labelElements = [];
    groupBy.forEach(col => {
      var _updatedFilters;
      var filterValues = (0, _core.ensureIsArray)((_updatedFilters = updatedFilters) == null ? void 0 : _updatedFilters[col]);
      if (filterValues.length) {
        var valueLabels = filterValues;
        labelElements.push("" + valueLabels.join(', '));
      }
    });
    console.log('labelElements', labelElements);
    console.log('groupByValues', groupByValues);
    console.log('updatedFilters', updatedFilters);
    console.log('key', key);
    console.log('value', value);
    return {
      dataMask: {
        extraFormData: {
          time_range: value
        },
        filterState: {
          label: labelElements.join(', ').length > 0 ? labelElements : null,
          value: groupByValues.length ? groupByValues : null
        }
      }
    };
  };
  var toggleFilter = (0, _react.useCallback)(function toggleFilter(key, val) {
    if (!emitCrossFilters) {
      return;
    }
    setDataMask(getCrossFilterDataMask(key, val).dataMask);
  }, [emitCrossFilters, getCrossFilterDataMask, setDataMask]);
  return {
    toggleFilter
  };
};
exports.useFilter = useFilter;