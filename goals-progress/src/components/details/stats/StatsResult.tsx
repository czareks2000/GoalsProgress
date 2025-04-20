import { useStore } from "../../../app/stores/store";
import { StatsType } from "./Stats";

interface Props {
    selectedType: StatsType;
    selectedCategory: string;
    sums?: Record<string, number>;
    averages?: Record<string, number>;
}

export function StatsResult({ selectedType, selectedCategory, sums, averages }: Props) {
    const { 
        goalStore: {selectedGoal: goal}, 
        commonStore: {roundValue}
    } = useStore();
    
    const getValue = (values: Record<string, number> | undefined) => {
        if (!values) return 0;

        if (selectedCategory)
            return roundValue(values[selectedCategory] ?? 0);

        const total = Object.values(values).reduce((acc, val) => acc + (val ?? 0), 0);
        return roundValue(total);
    }

    const isSum = selectedType === StatsType.Sum;
    const value = getValue(isSum ? sums : averages)

    const label = isSum ? 'Sum in selected period' : 'Monthly average';
    const displayValue = value > 0 ? value : '--';

    return (
        <h2>
            {`${label}: ${displayValue} ${goal?.unit}`}
        </h2>
    );
}