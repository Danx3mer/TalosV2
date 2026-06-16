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


def htmlPrint(prin):
    print(f'''Content-type:text/html\r\n\r\n
    <!DOCTYPE html>
    <html>
        <head>
            <p>{prin}</p>
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

    success = db.writeGrades(grade)

    courseData = db.getCourseCookie()
    
    print(f"Set-Cookie: courseData={courseData}; Path=/; Max-Age=86400")
    
    htmlRedirect(f"course.html?course={next(iter(grade))}&success={success}")

if __name__ == '__main__':
    main()

