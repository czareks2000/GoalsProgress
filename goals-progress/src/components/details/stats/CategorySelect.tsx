import { Option } from "../../../app/models/Common";

interface Props {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    options: Option[];
    width?: string;
}

export function CategorySelect({ selectedOption, setSelectedOption, options, width = '50%' }: Props) {
    return (
        <div className="form-control" style={{width}}>
            <label>{'Category'}</label>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                <option value="">{'All'}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}