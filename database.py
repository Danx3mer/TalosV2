import json

# Constants to access DB
UDB_COL_PASSWORD = 'Password'

PATH_TO_USER_DB = 'databases/user.json'

def readFromFile(fname):
    file = open(fname, "r")
    return json.loads(file.read())

def login(username, password):
    return username in USER_DATA and password == USER_DATA[username][UDB_COL_PASSWORD]

# Returns the user data as a dictionary
def getUserDictionary(username):
    return USER_DATA[username]

def getUsersOfType(t):
    val = 0
    for user in USER_DATA:
        if USER_DATA[user]['Type'] == t: val += 1
    return val

USER_DATA = readFromFile(PATH_TO_USER_DB)
