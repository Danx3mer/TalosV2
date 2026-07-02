import USER_DB from "../databases/user.json";
import COURSE_DB from "../databases/course.json";

function userInDB(u) {
  return u in USER_DB;
}

export function login(u, p) {
  return userInDB(u) && USER_DB[u]["Password"] === p;
}

export function userType(u) {
  return USER_DB[u]["Type"];
}

function getAmtUsersOfType(t) {
  var amt = 0;
  for (const [uName, uData] of Object.entries(USER_DB)) {
    if (uData["Type"] === t) amt++;
  }
  return amt;
}

function getCoursesOf(uName) {
  if (!userInDB(uName)) return false;

  var uType = userType(uName);

  var courses = [];

  for (const [courseName, courseData] of Object.entries(COURSE_DB)) {
    var people =
      uType == "Teacher" ? courseData[uType] : Object.keys(courseData[uType]);

    if (people.includes(uName)) courses.push(courseName);
  }

  return courses;
}

export function userData(uName) {
  if (!userInDB(uName)) return false;

  var uType = userType(uName);

  switch (uType) {
    case "Admin":
      {
        var amtTeachers = getAmtUsersOfType("Teacher");
        var amtStudents = getAmtUsersOfType("Student");
        var amtCourses = getAmtCourses();

        return [amtTeachers, amtStudents, amtCourses];
      }
      break;
    default:
      return getCoursesOf(uName);
  }
}

// COURSE DB
function getAmtCourses() {
  return COURSE_DB.length;
}

export function courseName(cID) {
  if (!Object.keys(COURSE_DB).includes(cID)) return false;
  return COURSE_DB[cID]["Name"];
}

export function getUsersOfCourse(uType, cID) {
  if (!["Teacher", "Student"].includes(uType)) return false;
  if (!Object.keys(COURSE_DB).includes(cID)) return false;

  return COURSE_DB[cID][uType];
}
