const dateArr = {
  "Jan": 1,
  "Feb": 2,
  "Mar": 3,
  "Apr": 4,
  "May": 5,
  "Jun": 6,
  "Jul": 7,
  "Aug": 8,
  "Sep": 9,
  "Oct": 10,
  "Nov": 11,
  "Dec": 12
}



export const convertDateToNumber = (dateString) => {
  return dateArr[dateString];
}

export const toastrOptions = {
  timeOut: 6000, 
  showCloseButton: true, 
}