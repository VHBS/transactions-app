import TestModel from '../models/TestModel'

test('Testing Model', () => {
  const test = new TestModel('Victor')
  expect(test.name).toEqual('Victor')
})
