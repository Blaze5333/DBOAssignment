/*eslint-disable*/

const filterOnHours=(events)=>{
    const shiftsWithOverlapFlag = events.map(event => {
        if (!event.booked) {
          const overlaps = events.some(otherEvent => {
            if (otherEvent.id === event.id) {
              return false;
            }
            return (
              otherEvent.booked &&
              otherEvent.startTime < event.endTime &&
              otherEvent.endTime > event.startTime
            );
          });
          return { ...event, overlappingHours: overlaps };
        } else {
          return { ...event, overlappingHours: false };
        }
      });
      return shiftsWithOverlapFlag;
}
module.exports={filterOnHours}