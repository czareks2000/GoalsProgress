import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import dayjs from "dayjs";
import { useGoalStats } from "../../../app/hooks/useGoalStats";
import { useEffect, useMemo, useState } from "react";
import { useDateHelpers } from "../../../app/hooks/useDateHelpers";
import { StatsResult } from "./StatsResult";
import { TypeSelect } from "./TypeSelect";
import { PeriodSelect } from "./PeriodSelect";
import { CategorySelect } from "./CategorySelect";
import { Option } from "../../../app/models/Common";
import { MonthSelect } from "./MonthSelect";

export enum StatsType {
    Sum = 1,
    Avg
}

export enum Period {
    ThisMonth = 1,
    WholePeriod,
    Custom
}

export default observer(function Stats() {
    const { goalStore: {selectedGoal: goal} } = useStore();
    const { getStartOfMonth, getEndOfMonth } = useDateHelpers();
    const { filterProgressesByDate, sumsByCategory, 
        averagesPerMonthByCategory, getAllMonths } = useGoalStats();

    if (!goal) return <></>

    const [months] = useState(getAllMonths(goal.progresses!));
    const [wholePeriod] = useState({ start: getStartOfMonth(months[0]), end: getEndOfMonth(months[months.length - 1]) });

    const [selectedType, setSelectedType] = useState(StatsType.Sum);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState(Period.ThisMonth);
    const [selectedMonth, setSelectedMonth] = useState(months[0].format('YYYY-MM'));

    const [averages] = useState<Record<string, number>>(averagesPerMonthByCategory(goal.progresses!, wholePeriod.start, wholePeriod.end));
    const [sums, setSums] = useState<Record<string, number>>();

    const getPeriodDates = () => {
        const now = dayjs();

        if (selectedPeriod === Period.ThisMonth)
            return { start: getStartOfMonth(now), end: getEndOfMonth(now) };

        if (selectedPeriod === Period.WholePeriod)
            return wholePeriod;

        const customMonth = dayjs(selectedMonth);
            return { start: getStartOfMonth(customMonth), end: getEndOfMonth(customMonth) };
    };

    const filteredProgresses = useMemo(() => {
        const { start, end } = getPeriodDates();
        return filterProgressesByDate(goal.progresses!, start, end);

    }, [selectedPeriod, selectedMonth]);

    useEffect(() => setSums(sumsByCategory(filteredProgresses)), [filteredProgresses]);

    return (
        <div className="stats outline outline-primary">

            <StatsResult 
                selectedType={selectedType}
                selectedCategory={selectedCategory}
                sums={sums}
                averages={averages}
            />

            <div style={{display: 'flex', columnGap: '10px'}}>
                <TypeSelect 
                    selectedType={selectedType} 
                    setSelectedType={setSelectedType} 
                />
                <CategorySelect
                    selectedOption={selectedCategory} 
                    setSelectedOption={setSelectedCategory} 
                    options={goal.categories as Option[]} 
                />
            </div>

            {selectedType === StatsType.Sum &&
            <div style={{display: 'flex', columnGap: '10px', marginTop: '10px'}}>
                <PeriodSelect
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                    width={selectedPeriod === Period.Custom ? '50%' : '100%'}
                />
                {selectedPeriod === Period.Custom && 
                <MonthSelect 
                    selectedMonth={selectedMonth} 
                    setSelectedMonth={setSelectedMonth}
                    months={months}
                />}
            </div>}
            
        </div>
    )
})
