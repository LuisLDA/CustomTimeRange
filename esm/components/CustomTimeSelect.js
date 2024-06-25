import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
var {
  RangePicker
} = DatePicker;
export var CustomTimeSelect = _ref => {
  var {
    toggleFilter
  } = _ref;
  useEffect(() => {
    // Directamente usando moment, sin convertir a dayjs
    toggleFilter('time_range', moment().subtract(1, 'months').toISOString() + " : " + moment().toISOString());
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RangePicker, {
    allowClear: false,
    onChange: e => {
      console.log(e);
      if (e) {
        var start = e[0].toISOString().split('T')[0] + 'T00:00:00';
        // Convertir end a un objeto Date
        //@ts-ignore
        var endDate = new Date(e[1]);
        // Sumar un día
        endDate.setDate(endDate.getDate() + 1);
        // Convertir de nuevo a cadena ISO y formatear
        var end = endDate.toISOString().split('T')[0] + 'T00:00:00';
        console.log(start, end);
        toggleFilter('time_range', start + " : " + end);
      }
    },
    disabledDate: current => {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    }
    //@ts-ignore
    ,
    defaultValue: [moment().subtract(1, 'months'), moment()]
    //Set default value 1 month ago
    //defaultValue={[convertToDayjs(moment().subtract(1, 'months')), convertToDayjs(moment())]}         
  }));
};