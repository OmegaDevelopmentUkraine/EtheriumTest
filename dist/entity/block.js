"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const typeorm_1 = require("typeorm");
let Block = class Block {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Block.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "difficulty", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "extraData", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Block.prototype, "gasLimit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Block.prototype, "gasUsed", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "hash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "logsBloom", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "miner", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "mixHash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "nonce", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Block.prototype, "number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "parentHash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "receiptsRoot", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "sha3Uncles", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Block.prototype, "size", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "stateRoot", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Block.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "totalDifficulty", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "transactionsRoot", void 0);
__decorate([
    typeorm_1.Column('json'),
    __metadata("design:type", Array)
], Block.prototype, "transactions", void 0);
__decorate([
    typeorm_1.Column('json'),
    __metadata("design:type", Array)
], Block.prototype, "uncles", void 0);
Block = __decorate([
    typeorm_1.Entity()
], Block);
exports.Block = Block;
//# sourceMappingURL=block.js.map