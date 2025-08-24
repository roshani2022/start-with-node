const fs = require('fs');
const { buffer } = require('stream/consumers');

const reuestHandler =(req,res) =>{
    const url  = req.url;
    const method = req.method ;

    if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Uername</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add user</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if(url ==="/create-user" && method ==='POST'){
    const body = [];
    req.on('data',(chunk)=>{
        body.push(chunk)
    })

    return req.on('end',()=>{
        const parseBody = Buffer.concat(body).toString()
         console.log(parseBody)
        const list = parseBody.split("=")[1];
        console.log(list);
        fs.writeFile("user.txt",list,(err)=>{
            res.statusCode = 302;
            res.setHeader("Location","/");
            return res.end();
        })
    })
  }

    if(url === '/user'){
         res.write('<html>')
         res.write('<head><title>List</title></head>')
         res.write('<body><ul><li>user1</li></ul></body>')
         res.write('</html>')
          return res.end()
        }
        res.setHeader('Content-Type',"text/HTML")
        res.write('<html>')
        res.write('<head><title>Welcome</title></head>')
        res.write('<body><h1>Welcome to the Club!</h1></body>')
        res.write('</html>')
        res.end()

}

module.exports = reuestHandler;