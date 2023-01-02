function isFinished(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'finishDate' in valueToTest &&
    typeof valueToTest['finishDate'] === 'string'
  )
}

function isListItem(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'bookId' in valueToTest &&
    typeof valueToTest['bookId'] === 'number'
  )
}

export { isFinished, isListItem }
