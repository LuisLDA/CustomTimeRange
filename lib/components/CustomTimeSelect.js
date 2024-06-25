"use strict";

exports.__esModule = true;
exports.CustomTimeSelect = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var {
  RangePicker
} = _antd.DatePicker;
var CustomTimeSelect = _ref => {
  var {
    toggleFilter
  } = _ref;
  (0, _react.useEffect)(() => {
    // Directamente usando moment, sin convertir a dayjs
    toggleFilter('time_range', (0, _moment.default)().subtract(1, 'months').toISOString() + " : " + (0, _moment.default)().toISOString());
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(RangePicker, {
    allowClear: false,
    onChange: e => {
      console.log(e);
      if (e) {
        var start = e[0].toISOString().split('T')[0] + 'T00:00:00';
        var end = e[1].toISOString().split('T')[0] + 'T23:59:59';
        console.log(start, end);
        toggleFilter('time_range', start + " : " + end);
      }
    },
    disabledDate: current => {
      // Can not select days before today and today
      return current && current > (0, _moment.default)().endOf('day');
    }
    //@ts-ignore
    ,
    defaultValue: [(0, _moment.default)().subtract(1, 'months'), (0, _moment.default)()]
    //Set default value 1 month ago
    //defaultValue={[convertToDayjs(moment().subtract(1, 'months')), convertToDayjs(moment())]}         
  }));
};
exports.CustomTimeSelect = CustomTimeSelect;