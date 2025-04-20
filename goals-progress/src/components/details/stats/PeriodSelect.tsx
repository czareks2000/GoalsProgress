import { Period } from "./Stats";

interface Props {
    selectedPeriod: number;
    setSelectedPeriod: (period: number) => void;
    width?: string;
}

export function PeriodSelect({ selectedPeriod, setSelectedPeriod, width = '50%' }: Props) {
    return (
        <div className="form-control" style={{width}}>
            <label>Period</label>
            <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            >
                <option value={Period.ThisMonth}>This Month</option>
                <option value={Period.WholePeriod}>Whole Period</option>
                <option value={Period.Custom}>Custom Month</option>
            </select>
        </div>
    );
}