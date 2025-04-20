import dayjs, { Dayjs } from "dayjs";
import { Progress } from "../models/Progress";

export const useGoalStats = () => {

    const filterProgressesByDate = (progresses: Progress[], from: Dayjs, to: Dayjs): Progress[] => {
        return progresses.filter(p => {
            const progressDate = dayjs(p.date);
            return progressDate >= from && progressDate <= to;
        });
    }

    const sumsByCategory = (progresses: Progress[]): Record<string, number> => {
        const result: Record<string, number> = {};
      
        for (const progress of progresses) {
          const categoryId = progress.category!.id;
          const weightedValue = progress.value * progress.category!.multiplier;

          if (!result[categoryId]) {
            result[categoryId] = 0;
          }
      
          result[categoryId] += weightedValue;
        }
      
        return result;
    }

    const averagesPerMonthByCategory = (progresses: Progress[], from: Dayjs, to: Dayjs): Record<string, number> => {
        const months = (to.get('year') - from.get('year')) * 12 + (to.get('month') - from.get('month')) + 1;
      
        const sums = sumsByCategory(progresses);
      
        const averages: Record<string, number> = {};
        for (const categoryId in sums) {
          averages[categoryId] = sums[categoryId] / months;
        }
      
        return averages;
    }

    const getAllMonths = (progresses: Progress[]): Dayjs[] => {
        const monthSet = new Set<string>();
    
        for (const progress of progresses) {
            const date = dayjs(progress.date);
            const year = date.year();
            const month = date.month() + 1;
            const key = `${year}-${month.toString().padStart(2, '0')}`;
            monthSet.add(key);
        }

        return Array.from(monthSet)
            .map(key => dayjs(key))
            .sort((a, b) => a.isBefore(b) ? -1 : 1);
    };

    return { filterProgressesByDate, sumsByCategory, averagesPerMonthByCategory, getAllMonths }
}