export { isFinished, isListItem }

const isFinished = (valueToTest: any) => {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'finishDate' in valueToTest &&
    typeof valueToTest['finishDate'] === 'string'
  )
}

const isListItem = (valueToTest: any) => {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'bookId' in valueToTest &&
    typeof valueToTest['bookId'] === 'number'
  )
}
