import jwt from 'jsonwebtoken';

// Function to generate a JWT token for user authentication
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '10d', 
  });

  // Set the token in a cookie
  res.cookie('jwt', token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
  });

    // Return the token for further use, if needed
  return token;
}