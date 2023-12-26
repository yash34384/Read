class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const name = this.queryStr.name ? {
      name: {
        $regex: this.queryStr.name,
        $options: "i"
      }
    } : {};
    const author = this.queryStr.author ? {
      author: {
        $regex: this.queryStr.author,
        $options: "i"
      }
    } : {};
    this.query = this.query.find({ ...name, ...author });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeField = ["name", "author", "page", "limit"];
    removeField.forEach(ele => {
      delete queryCopy[ele];
    });
    this.query = this.query.find(queryCopy);
    return this;
  }
  pagination(resultPerPage) {
    const page = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (page - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;