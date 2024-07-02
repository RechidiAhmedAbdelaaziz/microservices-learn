import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schema";


@Schema()
export class RefreshToken extends Document {

    @Prop({ required: true })
    token: string;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    userId: Types.ObjectId;

    @Prop({ required: true })
    expires: Date;


}