export default class BaseEntity {
    createdAt?: Date;
    updatedAt?: Date;

    constructor(createdAt?: Date, updatedAt?: Date) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}