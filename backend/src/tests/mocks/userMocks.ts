const inputCreateUserMock = {
  userName: 'Airton',
  password: 'Airton12'
}

const createUserModelMock = {
  getData: {
    id: 'e57e2c02-2a9f-4dca-a20b-403affd554ed',
    userName: 'Airton',
    accountId: 'd0486290-49e6-4f65-9919-df4378baae0b'
  }
}

const findUserModelMock = {
  id: 'e57e2c02-2a9f-4dca-a20b-403affd554ed',
  userName: 'Airton',
  password: '$2a$10$k5Vw.FdvWOsK1ELnRlTjOu75IGeLdfcK04KcGOx.oO/8A77EBrb5K',
  accountId: 'd8723224-e445-4ccc-aeb3-a4ad55462c84',
  account: {
    id: 'd0486290-49e6-4f65-9919-df4378baae0b',
    balance: 10000
  }
}

const userAlreadyExistMessageMock = { message: 'user already exists' }

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMjRlNjU2MGYtYzMwZS00NDJkLTk5N2UtM2M5OTQyN2U1YjdmIiwidXNlck5hbWUiOiJMaWdpYTEwIiwiYWNjb3VudElkIjoiZTc4MmY5ZDEtOTFkMy00ZTRiLThhMGEtOTVmNmMzYWE3OThmIiwiYWNjb3VudCI6eyJpZCI6ImU3ODJmOWQxLTkxZDMtNGU0Yi04YTBhLTk1ZjZjM2FhNzk4ZiIsImJhbGFuY2UiOjEwMDAwfX0sImlhdCI6MTY2OTEzODkyNCwiZXhwIjoxNjY5MjI1MzI0fQ.bS15zAeL0JhnbZCuWKWZCBE8gOs2gy9rSQjJjD3YdHA'

export {
  inputCreateUserMock,
  createUserModelMock,
  findUserModelMock,
  userAlreadyExistMessageMock,
  tokenMock
}
