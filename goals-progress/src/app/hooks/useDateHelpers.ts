import { Dayjs } from 'dayjs';

export const useDateHelpers = () => {
    const getStartOfMonth = (date: Dayjs): Dayjs => {
        return date.startOf('month');
    };

    const getEndOfMonth = (date: Dayjs): Dayjs => {
        return date.endOf('month');
    };

    const getStartOfWeek = (date: Dayjs): Dayjs => {
        return date.startOf('week').add(1, 'day');
    };

    const getEndOfWeek = (date: Dayjs): Dayjs => {
        return date.startOf('week').add(7, 'day').endOf('day');
    };

    return { getStartOfMonth, getEndOfMonth, getStartOfWeek, getEndOfWeek };
};