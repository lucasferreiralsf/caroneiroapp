export const TravelsWithOwnerFragment = `
fragment TravelsWithOwner on Travels  {
  id
  travelName
  travelDate
  travelCost
  isSharingCost
  isRecurrent
  recurrenceTimes
  recurrenceType
  createdAt
  updatedAt
  travelOwner {
    id
    firstName
    lastName
    email
  }
  passengers {
    id
    firstName
    lastName
    email
  }
}
`;
