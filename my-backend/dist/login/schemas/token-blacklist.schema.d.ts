import { Document } from 'mongoose';
export type TokenBlacklistDocument = TokenBlacklist & Document;
export declare class TokenBlacklist {
    token: string;
    user_id: string;
    email: string;
    revoked_at: Date;
    expires_at: Date;
    reason: string;
}
export declare const TokenBlacklistSchema: import("mongoose").Schema<TokenBlacklist, import("mongoose").Model<TokenBlacklist, any, any, any, any, any, TokenBlacklist>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    token?: import("mongoose").SchemaDefinitionProperty<string, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user_id?: import("mongoose").SchemaDefinitionProperty<string, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    revoked_at?: import("mongoose").SchemaDefinitionProperty<Date, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expires_at?: import("mongoose").SchemaDefinitionProperty<Date, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TokenBlacklist>;
