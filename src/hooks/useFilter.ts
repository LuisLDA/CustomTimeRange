import { ensureIsArray } from "@superset-ui/core";
import { useCallback } from "react";

export const useFilter = (
    { filters, emitCrossFilters, setDataMask }: any
) => {


    const isActiveFilterValue = useCallback(
        function isActiveFilterValue(key: string, val: any) {
            if (Array.isArray(val)) {
                return !!filters && val.some(v => filters[key]?.includes(v));
            }
            return !!filters && filters[key]?.includes(val);
        },
        [filters],
    );


    const getCrossFilterDataMask = (key: string, value: any) => {
        let updatedFilters = { ...(filters || {}) };
        if (filters && isActiveFilterValue(key, value)) {
            updatedFilters = {};
        } else {
            updatedFilters = {
                [key]: Array.isArray(value) ? value : [value],
            };
        }
        if (
            Array.isArray(updatedFilters[key]) &&
            updatedFilters[key].length === 0
        ) {
            delete updatedFilters[key];
        }

        const groupBy = Object.keys(updatedFilters);
        const groupByValues = Object.values(updatedFilters);
        const labelElements: string[] = [];
        groupBy.forEach(col => {
            const filterValues = ensureIsArray(updatedFilters?.[col]);
            if (filterValues.length) {
                const valueLabels = filterValues;
                labelElements.push(`${valueLabels.join(', ')}`);
            }
        });

        console.log('labelElements', labelElements)
        console.log('groupByValues', groupByValues)
        console.log('updatedFilters', updatedFilters)
        console.log('key', key)
        console.log('value', value)

        return {
            dataMask: {
                extraFormData: {
                    time_range: value,
                },
                filterState: {
                    label: labelElements.join(', ').length > 0 ? labelElements : null,
                    value: groupByValues.length ? groupByValues : null,
                },
            },
        };
    };


    const toggleFilter = useCallback(
        function toggleFilter(key: string, val: any) {
            if (!emitCrossFilters) {
                return;
            }
            setDataMask(getCrossFilterDataMask(key, val).dataMask);
        },
        [emitCrossFilters, getCrossFilterDataMask, setDataMask],
    );

    return {
        toggleFilter,
    }
}
