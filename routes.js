const fs = require("fs");
const { text } = require("stream/consumers");
const reuestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      // console.log(parseBody)

      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head> <title>This is my first page </title></head>");
  res.write("<body><h1>Hello from  Node.js server<h1> </body>");
  res.write("</html>");
  res.end();
};

// module.exports = reuestHandler;

// module.exports = {
//   handler : reuestHandler,
//   text : "exporting to many thing"
// }

// module.exports.handler = reuestHandler;
// module.exports.text = "Some hard coded text"

exports.handler = reuestHandler;
exports.text = "Short way of exporting"


