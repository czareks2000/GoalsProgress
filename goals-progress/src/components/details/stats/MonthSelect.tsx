import { Dayjs } from "dayjs";

interface Props {
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
    months: Dayjs[];
    width?: string;
}

export function MonthSelect({ selectedMonth, setSelectedMonth, months, width = '50%' }: Props) {
    return (
        <div className="form-control" style={{width}}>
            <label>Custom Month</label>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                {months.map(date => (
                    <option key={date.format('YYYY-MM')} value={date.format('YYYY-MM')}>
                        {date.format('MMMM YYYY')}
                    </option>
                ))}
            </select>
        </div>
    );
}