import React, { useEffect } from 'react'
import { DatePicker, Space } from 'antd';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;

export const CustomTimeSelect = ({ toggleFilter }: { toggleFilter: any }) => {


    useEffect(() => {
        // Directamente usando moment, sin convertir a dayjs
        const dateInit = `${moment().subtract(1, 'months').toISOString()} : ${moment().add(1, 'days').toISOString()}`
        toggleFilter('time_range', dateInit)
        console.log('Time Range initial', dateInit)
    }, [])

    return (
        <>
            <RangePicker
                allowClear={false}
                onChange={(e) => {
                    console.log(e)
                    if (e) {
                        const start = e[0]!!.toISOString().split('T')[0] + 'T00:00:00'
                        // Convertir end a un objeto Date
                        //@ts-ignore
                        let endDate = new Date(e[1]!!)
                        // Sumar un día
                        endDate.setDate(endDate.getDate() + 1)
                        // Convertir de nuevo a cadena ISO y formatear
                        const end = endDate.toISOString().split('T')[0] + 'T00:00:00'
                        console.log(start, end)
                        toggleFilter('time_range', `${start} : ${end}`)
                    }
                }}

                disabledDate={(current: any) => {
                    // Can not select days before today and today
                    return current && current > moment().endOf('day');
                }}
                //@ts-ignore
                defaultValue={[moment().subtract(1, 'months'), moment()]}
            //Set default value 1 month ago
            //defaultValue={[convertToDayjs(moment().subtract(1, 'months')), convertToDayjs(moment())]}         
            />

        </>

    )
}
