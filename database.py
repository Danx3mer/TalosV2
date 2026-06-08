import json

# Constants to access DB
UDB_COL_PASSWORD = 'Password'

PATH_TO_USER_DB = 'databases/user.json'

def readFromFile(fname):
    file = open(fname, "r")
    return json.loads(file.read())

def login(username, password):
    return username in USER_DATA and password == USER_DATA[username][UDB_COL_PASSWORD]

def writeToFile(fname, dataframe):
    dataframe.to_csv(fname, index=False)

USER_DATA = readFromFile(PATH_TO_USER_DB)
