const express = require('express');
const app = express();
const PORT = 3000 ;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.get(('/ahmed'),function(req,res,next) {

    res.send('Hello world!!!');
    
    
});


let userData = [];  

// password validation using regex method 
function validatePassword(password) {
  // At least 1 lowercase, 1 uppercase, 1 number, 1 special char, min 8 length
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

// SIGNUP API


app.post('/signup', (req, res) => {
  const { userEmail, password } = req.body;
  let isFound = false;

//   console.log("Signup Email:", userEmail);
//   console.log("Signup Password:", password);

  for (let i = 0; i < userData.length; i++) {
    if (userEmail === userData[i].email) {
      isFound = true;
      return res.send({
        status: 400,
        message: 'Email already registered'
      });
    }
  }


  if (!validatePassword(password)) {
    return res.send({
      status: 400,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    });
  }

  userData.push({ email: userEmail, pass: password });

  res.send({
    status: 200,
    message: "User registered successfully",
    // users: userData
  });
});


// LOGIN API 
app.post('/login', (req, res) => {
  const { userEmail, password } = req.body;   
  let isFound = false;

//   console.log("Login Email:", userEmail);
//   console.log("Login Password:", password);

  if (!validatePassword(password)) {
    return res.send({
      status: 400,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    });
  }


  for (var i = 0; i < userData.length; i++) {
    if (userEmail === userData[i].email &&
        password === userData[i].pass) {
      isFound = true;
      return res.send({
        status: 200,
        message: 'Login Successfull !'
      });
    }
  }

  if (isFound === false) {
    res.send({
      status: 404,
      message: 'Invalid Email or Password'
    });
  }
});


app.listen(PORT, () => {
    console.log(`server is running, on port : ${PORT}`)
});