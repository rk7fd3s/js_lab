const BoxSDK = require('box-node-sdk');
const FolderTree = require('./FolderTree');

// Initialize the SDK with your app credentials
const sdk = new BoxSDK({
  clientID: 'nmfvludyzsnywakx94kkailsw47ssk1m',
  clientSecret: 'OK85u8NFRq4ZyP0baGObHXqjigd9FlFj'
});

const client = sdk.getBasicClient('EJXt5fFp39lXlF8wgYJGH1TLqrlq1UaP');

const folderTree = new FolderTree(client);

const execute = async function () {
  const folderData = await folderTree.execute('80603230549');
  console.log('folderTree.execute folderData: ', folderData);
}

execute();
