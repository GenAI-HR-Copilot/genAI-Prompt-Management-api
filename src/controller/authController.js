import sdk from 'node-appwrite';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const client = req.app.locals.appwriteClient;
    const account = new sdk.Account(client);

    // Create a session (log in)
    const session = await account.createEmailSession(email, password);

    res.json({
      message: 'Login successful',
      sessionId: session.$id,
      userId: session.userId
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Login failed. Please check your credentials.' });
  }
};
