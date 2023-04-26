 import * as moment from 'moment'; // Make sure you have installed moment from npm
export class DateService{

   

  // Add these methods to your Service

  /**
   * @description group Array of dates by an entire week
   * @param dates Array of dates
   */
   getWeeksMapped(dates: Date[]): Map<string, number[]> {
    const weeks = dates.reduce((week, date) => {
      const yearWeek = `${moment(date).year()}-${moment(date).week()}`;
      if (!week.has(yearWeek)) {
        week.set(yearWeek, []);
      }
      week.get(yearWeek).push(date.getTime()); // timestamp returned
      return week;
    }, new Map());

    return weeks;
  }


  /**
   * @description Returns the dates between 2 dates
   * @param startDate Initial date
   * @param endDate Final date
   * @param dayStep Day step
   */
   getDateRange(startDate: Date, endDate: Date, dayStep = 1): Date[] {
    const dateArray = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + dayStep);
    }
    return dateArray;
  }
   getWeekOfMonth(date:Date) {
    let adjustedDate = date.getDate()+ date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}
}