const axiosPostMock = {
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    user: {
      id: 'c4fa3204-2ab1-43c3-83b5-367c8d0b3f3a',
      userName: 'Ligia14',
      password: '$2a$10$VNuhX9K38jEb7qDrjF7qbOUwsx0LH4Igm9ZhkZ4GAJ60YxnpdYMWG',
      accountId: '59758d97-d358-490a-9e0a-49e0ca54ab94',
      account: {
        id: '59758d97-d358-490a-9e0a-49e0ca54ab94',
        balance: 10000
      }
    }
  }
}

const userAlreadyExistMessageMock = { data: { message: 'user already exists' } }

export {
  axiosPostMock,
  userAlreadyExistMessageMock
}
