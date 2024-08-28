const jwt = require("jsonwebtoken");

// Simple in-memory user storage for demo
const users = {
  "manoj@gmail.com": "manoj", 
  "tharun@gmail.com": "Tharun"
};

const login = (req, res) => {
  const { email, password } = req.body;

  
  console.log("Received credentials:", { email, password });

  
  if (users[email] && users[email] === password ) {
    
    const token = jwt.sign({ email }, "secretKey", { expiresIn: '24h' }); 
    res.json({
      success: true,
      message: "Login successful",
      token
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
};

module.exports = { login };
