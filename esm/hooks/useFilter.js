function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { ensureIsArray } from "@superset-ui/core";
import React, { useCallback } from "react";
export var useFilter = _ref => {
  var {
    filters,
    emitCrossFilters,
    setDataMask
  } = _ref;
  var isActiveFilterValue = useCallback(function isActiveFilterValue(key, val) {
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
      var filterValues = ensureIsArray((_updatedFilters = updatedFilters) == null ? void 0 : _updatedFilters[col]);
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
  var toggleFilter = useCallback(function toggleFilter(key, val) {
    if (!emitCrossFilters) {
      return;
    }
    setDataMask(getCrossFilterDataMask(key, val).dataMask);
  }, [emitCrossFilters, getCrossFilterDataMask, setDataMask]);
  return {
    toggleFilter
  };
};