function FolderTree(client) {
  this.client = client;
  this.error = [];
};

FolderTree.prototype._getFolder = async function (folderId) {
  const folder  = await this.client.folders.get(folderId).catch(err => {
    throw new Error('[folders.get]' + folderId);
  });

  const collaboration  = await this.client.folders.getCollaborations(folderId).catch(err => {
    throw new Error('[folders.getCollaborations]' + folderId);
  });

  Object.assign(folder, {
    collaborations: collaboration.entries
  });

  return folder;
};

FolderTree.prototype._loop = async function (folderId) {
  const res = await this._getFolder(folderId).catch(err => {
    this.error.push(err);
  });

  for (let i = 0; i < res.item_collection.entries.length; i++) {
    const item = res.item_collection.entries[i];
    if (item.type === "folder") {
      const r = await this._loop(item.id);
      res.item_collection.entries[i] = r;
    }
  }

  return res;
};

FolderTree.prototype.execute = async function (folderId) {
  const res = await this._loop(folderId);
  
  return {res, err: this.error};
};

module.exports = FolderTree;