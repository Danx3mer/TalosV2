#!/usr/bin/python3

import cgi
import cgitb
import random
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
    
    username = formData.getvalue("username")
    password = formData.getvalue("password")
    
    return username, password

def main():
    redirct_url = "../talosv2/"
    
    u,p = getData()

    
    
    if db.login(u, p): 
        #Create cookie
        print(f"Set-Cookie: username={u}; Path=/; Max-Age=86400")
        print(f"Set-Cookie: type={p}; Path=/; Max-Age=86400")
        print(f"Set-Cookie: data={db.getUserDictionary(u)}; Path=/; Max-Age=86400")

        #Redirect to home page
        redirct_url += f"home.html"
    else: 
        #Redirect back to login page w/ a failed login GET request
        redirct_url += "login.html?login=failed"

    htmlRedirect(redirct_url)

if __name__ == '__main__':
    main()
