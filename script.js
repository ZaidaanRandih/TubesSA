const courseForm = document.getElementById('course-form');
const courseTableBody = document.getElementById('course-table').getElementsByTagName('tbody')[0];
const optimizeBtn = document.getElementById('optimize-btn');
const optimizedTableBody = document.getElementById('optimized-table').getElementsByTagName('tbody')[0];

let courses = [
  { name: 'Matkul A', start: '06:00', end: '07:00' },
  { name: 'Matkul B', start: '06:30', end: '07:30' },
  { name: 'Matkul C', start: '08:00', end: '09:00' },
  { name: 'Matkul D', start: '10:00', end: '11:00' },
  { name: 'Matkul E', start: '11:30', end: '12:30' },
  { name: 'Matkul F', start: '13:00', end: '14:00' },
  { name: 'Matkul G', start: '15:00', end: '15:30' },
  { name: 'Matkul H', start: '15:15', end: '15:45' },
  { name: 'Matkul I', start: '16:00', end: '17:00' },
  { name: 'Matkul J', start: '16:30', end: '17:30' },
  { name: 'Matkul K', start: '17:30', end: '17:45' },
  { name: 'Matkul L', start: '07:30', end: '08:30' },
  { name: 'Matkul M', start: '10:30', end: '10:45' },
  { name: 'Matkul N', start: '11:15', end: '11:45' },
  { name: 'Matkul O', start: '16:15', end: '16:45' }
];

// Display dummy data in the table
courses.forEach(addCourseToTable);

courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const courseName = document.getElementById('course-name').value;
  const startTime = document.getElementById('start-time').value;
  const endTime = document.getElementById('end-time').value;
  const course = { name: courseName, start: startTime, end: endTime };
  courses.push(course);
  addCourseToTable(course);
  courseForm.reset();
});

optimizeBtn.addEventListener('click', () => {
  const method = document.getElementById('optimization-method').value;
  let optimizedCourses;
  if (method === 'greedy') {
    optimizedCourses = greedyAlgorithm([...courses]);
  } else if (method === 'backtracking') {
    optimizedCourses = backtrackingAlgorithm([...courses]);
  }
  displayOptimizedSchedule(optimizedCourses);
});

function addCourseToTable(course) {
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const startCell = document.createElement('td');
  const endCell = document.createElement('td');
  nameCell.textContent = course.name;
  startCell.textContent = course.start;
  endCell.textContent = course.end;
  row.appendChild(nameCell);
  row.appendChild(startCell);
  row.appendChild(endCell);
  courseTableBody.appendChild(row);
}

function greedyAlgorithm(courses) {
  // Sort courses by their end time
  courses.sort((a, b) => timeToMinutes(a.end) - timeToMinutes(b.end));
  const schedule = [];
  let currentTime = 0;

  for (const course of courses) {
    if (timeToMinutes(course.start) >= currentTime) {
      schedule.push(course);
      currentTime = timeToMinutes(course.end);
    }
  }

  console.log('Greedy Algorithm Result:', schedule);
  return schedule;
}

function backtrackingAlgorithm(courses) {
  let bestSchedule = [];

  function recursiveBacktrack(currentSchedule, remainingCourses) {
    // Check if the current schedule is the best found so far
    if (currentSchedule.length > bestSchedule.length) {
      bestSchedule = [...currentSchedule];
    }

    for (let i = 0; i < remainingCourses.length; i++) {
      const course = remainingCourses[i];
      // Check if the course can be added to the current schedule
      if (currentSchedule.length === 0 || timeToMinutes(course.start) >= timeToMinutes(currentSchedule[currentSchedule.length - 1].end)) {
        const newSchedule = [...currentSchedule, course];
        const newRemainingCourses = remainingCourses.slice(i + 1);
        recursiveBacktrack(newSchedule, newRemainingCourses);
      }
    }
  }

  recursiveBacktrack([], courses);
  console.log('Backtracking Result:', bestSchedule);
  return bestSchedule;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
}

function displayOptimizedSchedule(courses) {
  optimizedTableBody.innerHTML = '';
  for (const course of courses) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const startCell = document.createElement('td');
    const endCell = document.createElement('td');
    nameCell.textContent = course.name;
    startCell.textContent = course.start;
    endCell.textContent = course.end;
    row.appendChild(nameCell);
    row.appendChild(startCell);
    row.appendChild(endCell);
    optimizedTableBody.appendChild(row);
  }
}
