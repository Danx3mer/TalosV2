# Used for easy json manipulation
import json

# Constants to access DB
UDB_COL_PASSWORD = 'Password'

# Paths to databases
PATH_TO_USER_DB = 'databases/user.json'
PATH_TO_COURSE_DB = 'databases/course.json'

# Returns a dictionary object formed of the json file
def readFromFile(fname):
    file = open(fname, "r")
    return json.loads(file.read())

## Initialize data constants
USER_DATA = readFromFile(PATH_TO_USER_DB)
COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)

## USER DB
# Returns whether the username and password combination is valid
def login(username, password):
    return username in USER_DATA and password == USER_DATA[username][UDB_COL_PASSWORD]

# Returns the user data as a dictionary
def getUserDictionary(username):
    return USER_DATA[username]

# Returns the number of users of a certain type
def getUsersOfType(t):
    val = 0
    for user in USER_DATA:
        if USER_DATA[user]['Type'] == t: val += 1
    return val

## COURSE DB
# Returns the courses of a user. Requires both the user name and type
def getCoursesOf(name, t):
    courses = []
    for course in COURSE_DATA:
        if name in COURSE_DATA[course][t]: courses.append(course)
    return courses

# Returns the course data for a specified course id
def getCourseData(course):
    return COURSE_DATA[course]

# Returns the amount of courses stored in the json file
def courseAmount():
    return len(COURSE_DATA)
