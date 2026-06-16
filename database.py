# Used for easy json manipulation
import json
import os

# Constants to access DB
UDB_COL_PASSWORD = 'Password'

# Paths to databases
PATH_TO_USER_DB = 'databases/user.json'
PATH_TO_COURSE_DB = 'databases/course.json'

# Returns a dictionary object formed of the json file
def readFromFile(fname):
    with open(fname, "r") as file:
        return json.loads(file.read())

# Overwrites a file with the new data specified
def writeFile(path, data):
    try:
        temp_path = path + ".tmp"
        with open(temp_path, "w") as file:
            json.dump(data, file, indent=4)
        os.replace(temp_path, path)
        return True
    except:
        return False

## USER DB
# Returns whether the username and password combination is valid
def login(username, password):
    USER_DATA = readFromFile(PATH_TO_USER_DB)
    return username in USER_DATA and password == USER_DATA[username][UDB_COL_PASSWORD]

# Returns the user data as a dictionary
def getUserDictionary(username):
    USER_DATA = readFromFile(PATH_TO_USER_DB)
    return USER_DATA[username]

# Returns the number of users of a certain type
def getUsersOfType(t):
    USER_DATA = readFromFile(PATH_TO_USER_DB)
    val = 0
    for user in USER_DATA:
        if USER_DATA[user]['Type'] == t: val += 1
    return val

# Adds a user to the database
def userAdd(uName, uPass, uType):
    USER_DATA = readFromFile(PATH_TO_USER_DB)
    if uName in USER_DATA: return False
    USER_DATA[uName] = {"Password": uPass, "Type": uType, "TypeSpecific": []}
    return writeFile(PATH_TO_USER_DB, USER_DATA)

# Toggles a user's relation to a course
def userAssign(uName, course):
    USER_DATA = readFromFile(PATH_TO_USER_DB)
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    
    if uName not in USER_DATA: return False
    if course not in COURSE_DATA: return False

    uType = USER_DATA[uName]["Type"]

    if uName in COURSE_DATA[course][uType]:
        del COURSE_DATA[course][uType][uName]
        if uType == "Teacher":
            USER_DATA[uName]["TypeSpecific"].remove(course)
    else:
        if uType == "Teacher":
            COURSE_DATA[course][uType].append(uName)
            USER_DATA[uName]["TypeSpecific"].append(course)
        elif uType == "Student":
            COURSE_DATA[course][uType][uName] = 100

    return writeFile(PATH_TO_USER_DB, USER_DATA) and writeFile(PATH_TO_COURSE_DB, COURSE_DATA)

# Deletes a user from the database
def userDel(uName):
    USER_DATA = readFromFile(PATH_TO_USER_DB)
    if uName not in USER_DATA: return False
    del USER_DATA[uName]
    return writeFile(PATH_TO_USER_DB, USER_DATA)

## COURSE DB
# Returns the courses of a user. Requires both the user name and type
def getCoursesOf(name, t):
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    courses = []
    for course in COURSE_DATA:
        if name in COURSE_DATA[course][t]: courses.append(course)
    return courses

# Returns the course data for a specified course id
def getCourseData(course):
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    return COURSE_DATA[course]

# Returns all course data to be used as a cookie
def getCourseCookie():
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    return COURSE_DATA

# Adds a course
def addCourse(cID, cName):
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    if cID in COURSE_DATA: return False
    COURSE_DATA[cID] = {"Name": cName, "Teacher": [], "Student": []}
    return writeFile(PATH_TO_COURSE_DB, COURSE_DATA)

# Removes a course
def delCourse(cID):
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    if not cID in COURSE_DATA: return False
    del COURSE_DATA[cID]
    return writeFile(PATH_TO_COURSE_DB, COURSE_DATA)

# Returns the amount of courses stored in the json file
def courseAmount():
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    return len(COURSE_DATA)

# Overwrites all grade data for a course
def writeGrades(data):
    COURSE_DATA = readFromFile(PATH_TO_COURSE_DB)
    for key, value in data[next(iter(data))].items():
        COURSE_DATA[next(iter(data))]["Student"][key] = value
    return writeFile(PATH_TO_COURSE_DB, COURSE_DATA)
