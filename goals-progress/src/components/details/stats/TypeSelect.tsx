import { StatsType } from "./Stats";

interface Props {
    selectedType: number;
    setSelectedType: (type: number) => void;
}

export function TypeSelect({ selectedType, setSelectedType }: Props) {
    return (
        <div className="form-control" style={{width: '50%'}}>
            <label>Type</label>
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(Number(e.target.value))}
            >
                <option value={StatsType.Sum}>Sum</option>
                <option value={StatsType.Avg}>Monthly avg</option>
            </select>
        </div>
    );
}