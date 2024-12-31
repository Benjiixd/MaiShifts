import jwt from 'jsonwebtoken';
//import fs from 'fs';




export default function JWTverify(token) {
    //const publicKey = fs.readFileSync('./jwtRS256.key.pub', 'utf8');
    const publicKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDQ07iCxJf3eLzshVTh0wq5CNd4FRfyu5/9sz3B6ChKaISEzVw8+KfqXrd0B142OETC/kiCgZQbDqPj4vrkWg/cOErxps9EQuvaeShBGl4o1+jlouGHoXNxhidZ5tlIlkaG9fuObOJYEmdWOKvMihQzjpoaJVgtGUOjL/EFQUm1IPqFp9Oe8iPlRXJtYwDUR41DeC0Yl1SdTIHSUAYe/r5IUbV8xd/mOYbL46wg1FbB7plC9dweNTtISMqRrQlpquCzGFuensQNUcQHYr0t7boPyYOwezB7VBHbLw1Bn0Xn0lut8uMVOBqk5njfNQyCJVodLQGtCcuxt9mUpcYaKRdPbGadyROF0GyQts6NPEs0lPg/9bhTqWd+qXi/JKzbg+IxsMU1k4YpA/HZtINqXsx56v6GxwwVp8mHRFVjO44FolynGPT2GwqKAew5y4ilYOZFcogGLUjz4kUYY3REAj+LNkaAjxXSdWb8U9N0mCqtXAPDbHdJtG0oZUTwDfHkfGicPGyN7mxQvoxznPp6QdrzqI2iPIHgfxhH0Aql0VPh7gDBdc+9IuR4yV6bWUh3djRLQ5yB3Ay00EUu19HT6kLF0amofHqMA7VKXa9E5VY5g/mVXX08/tVdIuyoXV60rn+tCvU24Lw8ss+R39GzNTo0G2MK4/ib4QvcIkzlUjKRRw== smile@DESKTOP-POL2MSQ"
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            console.error(err);
            return false;
        }
        return decoded;
    });
}