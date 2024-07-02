import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Document } from "mongoose";

@Schema({
    timestamps: true,

})
export class User extends Document {

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, select: false })
    password: string;

    @Prop({ required: false })
    nickname?: string;

    @Prop({ type: String, required: false })
    avatar?: string;



}

