const { ObjectId } = require("mongodb");

module.exports = class Follow {
    constructor({
        userId,
        type,
        referenceId,
        isDeleted = false,
        createdAt = new Date(),
        createdBy = new ObjectId("000000000000000000000000"),
        modifiedAt = new Date(),
        modifiedBy = new ObjectId("000000000000000000000000"),
        _id
    }) {
        this.userId = userId;
        this.type = type;
        this.referenceId = referenceId;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.modifiedAt =  modifiedAt;
        this.modifiedBy = modifiedBy;
        this._id = _id;
    }

    getId() {
        return this._id?.toString() ?? null;
    }

    getUserId() {
        return this.userId?.toString() ?? null;
    }

    getReferenceId() {
        return this.referenceId?.toString() ?? null;
    }
}