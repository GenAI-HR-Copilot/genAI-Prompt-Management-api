import sdk from 'node-appwrite';

export const initAppwrite = () => {
  const client = new sdk.Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66b6f53700323ad8ed62')
    .setKey(
      'fb56685cfc7316fe0e241207c572d524d97da0c308de6b3bce8900c3af1750d45337561e03860da63c5fd71c538125fdcacd40a8d11550e551df99f497c35b50216409dc9ea3d5ec09250b2b293ffe404a3ddedc16043f68df1ffa88d0437d203e360f036912232942f16f1327541a0b30ccbf320c18783f5da77cfc400541ce'
    );

  console.log('Appwrite client initialized.');
  return client;
};

export const testAppwriteConnection = async (client) => {
  try {
    const users = new sdk.Users(client);
    await users.list();
    console.log('Successfully connected to Appwrite!');
    return true;
  } catch (error) {
    console.error('Failed to connect to Appwrite:', error);
    return false;
  }
};
