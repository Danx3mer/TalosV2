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
        params.append(formData.getvalue("cName"))

    params.append(formData.getvalue("cID"))

    return params

def main():
    params = getData() 

    success = False

    mode = params[0]

    if None in params: success = False
    else:
        if mode == "add":
            success = db.addCourse(params[2], params[1])
        else:
            success = db.delCourse(params[1])

    courseData = db.getCourseCookie()
    
    print(f"Set-Cookie: courseData={courseData}; Path=/; Max-Age=86400")

    htmlRedirect(f"courses.html?mode={mode}&success={success}")

if __name__ == '__main__':
    main()

