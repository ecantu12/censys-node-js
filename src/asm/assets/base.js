const CensysAsmAPI = require("../api");

class Assets extends CensysAsmAPI {
  constructor(assetType, ...args) {
    super(...args);
    this.basePath = `/assets/${assetType}`;
  }

  async *getAssets(pageNumber = 1, pageSize = null) {
    yield* this.getPage(this.basePath, pageNumber, pageSize);
  }

  getAssetById(assetId) {
    return this.request(`${this.basePath}/${assetId}`);
  }

  getCommentById(assetId, commentId) {
    return this.request(`${this.basePath}/${assetId}/comments/${commentId}`);
  }

  addComment(assetId, comment) {
    return this.request(
      `${this.basePath}/${assetId}/comments`,
      {},
      { method: "POST", body: JSON.stringify({ markdown: comment }) }
    );
  }

  addTag(assetId, tagName, color = null) {
    const data = { name: tagName };
    if (color) {
      data["color"] = color;
    }
    return this.request(
      `${this.basePath}/${assetId}/tags`,
      {},
      { method: "POST", body: JSON.stringify(data) }
    );
  }

  deleteTag(assetId, tagName) {
    return this.request(
      `${this.basePath}/${assetId}/tags/${tagName}`,
      {},
      { method: "DELETE" }
    );
  }
}

module.exports = Assets;
