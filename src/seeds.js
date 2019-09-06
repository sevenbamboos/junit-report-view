//import {TestCaseStatus} from './model'

export const mockProjects = [
  {
    id: 101,
    name: 'project-1, a small js component',
    active: true,
    latestReport: {
      id: 101,
      time: '2019-09-04',
      newlyFailed: 2,
      fixed: 15,
      ignore: 3,
      new: 0,
      deleted: 2
    }
  },
  {
    id: 102,
    name: 'project-2, shared library',
    active: true,
    latestReport: {
      id: 102,
      time: '2019-09-01',
      newlyFailed: 20,
      fixed: 1,
      ignore: 0,
      new: 2,
      deleted: 0
    }
  },
  {
    id: 103,
    name: 'project-3, 3rd party library',
    active: true
  },
]
