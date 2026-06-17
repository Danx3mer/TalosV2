#!/usr/bin/python3

import cgi
import cgitb
import database as db

cgitb.enable()

def htmlRedirect(url):
    print(f'''Content-type:text/html\r\n\r\n
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="refresh" content="0; url={url}">
        </head>
    </html>''')

def getData():       
    formData = cgi.FieldStorage()
    
    params = []

    params.append(formData.getvalue("type"))    
    
    if params[0] == "add":
        params.append(formData.getvalue("uType"))
        params.append(formData.getvalue("password"))
    elif params[0] == "assign":
        params.append(formData.getvalue("course"))
    
    params.append(formData.getvalue("username"))

    return params

def main():
    params = getData() 

    success = False

    if None in params: success = False
    else:
        if params[0] == "add":
            success = db.userAdd(params[3], params[2], params[1])
        elif params[0] == "assign":
            success = db.userAssign(params[2], params[1])
        else:
            success = db.userDel(params[1])

    htmlRedirect(f"users.html?mode={params[0]}&success={success}")

if __name__ == '__main__':
    main()

