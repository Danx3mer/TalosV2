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
    
    course = formData.getvalue("course")

    grades = {course: {}}

    for key in list(formData.keys()):
        if key.startswith("student-"):
            grades[course][key[8:]] = formData.getvalue(key)

    return grades 

def main():
    grade = getData() 

    cName = next(iter(grade))

    success = db.writeGrades(grade)

    courseData = db.getCourseCookie()
    
    print(f"Set-Cookie: courseData={courseData}; Path=/; Max-Age=86400")
    
    htmlRedirect(f"course.html?course={cName}&success={success}")

if __name__ == '__main__':
    main()

