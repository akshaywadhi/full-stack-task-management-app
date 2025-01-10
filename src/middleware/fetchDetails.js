
export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.id; // Attach userId to the request object
      next();
  } catch (error) {
      res.status(400).send('Invalid token');
  }
};
