#!/usr/bin/python3

def htmlRedirect(url):
    print(f'''Content-type:text/html\r\n\r\n
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="refresh" content="0; url={url}">
        </head>
    </html>''')

def main():
    #Create cookie
    print("Set-Cookie: username=; Path=/; Max-Age=0")
    print("Set-Cookie: type=; Path=/; Max-Age=0")
    print("Set-Cookie: data=; Path=/; Max-Age=0")
    print("Set-Cookie: courseData=; Path=/; Max-Age=0")

    htmlRedirect("login.html")

if __name__ == '__main__':
    main()
