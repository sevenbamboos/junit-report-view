const faker = require('faker');

const PROJECT_COUNT = 2;
const REPORT_COUNT = 3;
const TEST_COUNT = 2;

// TODO share with src/model.js
const TestCaseStatus = {
  PASSED: 'passed',
  FAILED: 'failed',
  IGNORE: 'ignore'
};

const TestCaseStatusArray = [TestCaseStatus.PASSED, TestCaseStatus.FAILED, TestCaseStatus.IGNORE];

const passRate = [0, 80, 95];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max-min)) + min;
}

function getRandomStatusFrom(someStatus) {
  const index = getRandomInt(0, someStatus.length);
  return someStatus[index];
}

function getRandomStatus(previous) {
  const seed = getRandomInt(0, 100);
  if (previous) {
    if (seed < 80) return previous;
    else {
      return getRandomStatusFrom(TestCaseStatusArray.filter(x => x !== previous));
    }   

  } else {
    if (seed <= passRate[1]) {
      return TestCaseStatus.PASSED;
    } else if (seed <= passRate[2]) {
      return TestCaseStatus.FAILED;
    } else {
      return TestCaseStatus.IGNORE;
    }
  }
}

function randomCases(previous, reportId) {
  const results = [];

  // TODO randomly add/remove tests
  if (previous) {
    previous.forEach(x => {
      const test = {
        id: faker.fake("{{random.uuid}}"),
        reportId,
        name: x.name,
        status: getRandomStatus(x.status)
      };
      results.push(test);
    });

  } else {
    const count = getRandomInt(TEST_COUNT, TEST_COUNT);
    [...Array(count)].forEach(_ => {
      const test = {
        id: faker.fake("{{random.uuid}}"),
        reportId,
        name: faker.fake("{{random.words}}"),
        status: getRandomStatus(null)
      };
      results.push(test);
    });
  }

  return results;
}

const projects = [];
const reports = [];
const testCases = [];

// projects
[...Array(PROJECT_COUNT)].forEach((x, i) => {

  const projectId = faker.fake("{{random.uuid}}");
  const project = {
    id: projectId,
    name: faker.fake("{{random.words}}"),
    active: true
  };

  const reportInProjects = [];

  let currTests = null, prevTests = null;

  // reports
  [...Array(REPORT_COUNT)].forEach((y, ii) => {

    const reportId = faker.fake("{{random.uuid}}");
    const report = {
      id: reportId,
      projectId: projectId,
      name: faker.fake("{{random.words}}"),
      time: new Date(faker.fake("{{date.past}}")),
      active: true
    };

    reportInProjects.push(report);
  });

  reportInProjects.sort((a, b) => a.time.getTime() - b.time.getTime());

  reportInProjects.forEach((x, i, arr) => {
    if (i > 0)  {
      x.previousReportId = arr[i-1].id
    }

    currTests = randomCases(prevTests, x.id);
    testCases.push(...currTests);
    prevTests = currTests;

  });

  project.latestReportId = reportInProjects[reportInProjects.length-1].id;
  reports.push(...reportInProjects);

  projects.push(project);

});

const output = {
  projects,
  reports,
  testCases
};
const fs = require('fs');
fs.writeFile('projects.json', JSON.stringify(output, null, 2), () => console.log('projects.json done'));
