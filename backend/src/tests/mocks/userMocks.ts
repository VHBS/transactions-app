const inputCreateUserModelMock = {
  accountId: 'd0486290-49e6-4f65-9919-df4378baae0b',
  userName: 'Airton',
  password: '22222'
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

const userAlreadyExistMessageMock = { message: 'User already exists' }

export {
  inputCreateUserModelMock,
  createUserModelMock,
  findUserModelMock,
  userAlreadyExistMessageMock
}
