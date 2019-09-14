export const UsersWithTravelsAndPassengers = `
fragment UsersWithTravelsAndPassengers on Users  {
  id
  firstName
  lastName
  primaryPhoneNumber
  secondaryPhoneNumber
  email
  emailIsVerified
  primaryPhoneNumberIsVerified
  googleId
  facebookId
  createdAt
  updatedAt
  ownerTravels {
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
  }
  travelsAsPassenger {
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
  }
}
`;
export const UsersWithTravelsPassengerPassword = `
fragment UsersWithTravelsPassengerPassword on Users  {
  id
  firstName
  lastName
  primaryPhoneNumber
  secondaryPhoneNumber
  email
  emailIsVerified
  password
  emailToken
  primaryPhoneNumberIsVerified
  googleId
  facebookId
  createdAt
  updatedAt
  ownerTravels {
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
  }
  travelsAsPassenger {
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
  }
}
`;
