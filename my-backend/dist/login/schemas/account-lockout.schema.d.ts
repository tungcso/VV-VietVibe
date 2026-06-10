import { Document, Types } from 'mongoose';
export type AccountLockoutDocument = AccountLockout & Document;
export declare class AccountLockout {
    user_id?: Types.ObjectId;
    email: string;
    failed_attempts: number;
    locked_until: Date | null;
    status: string;
    last_failed_ip: string | null;
    last_failed_user_agent: string | null;
    last_failed_at: Date | null;
    unlock_reason: string | null;
    unlocked_at: Date | null;
}
export declare const AccountLockoutSchema: import("mongoose").Schema<AccountLockout, import("mongoose").Model<AccountLockout, any, any, any, any, any, AccountLockout>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AccountLockout, Document<unknown, {}, AccountLockout, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user_id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    failed_attempts?: import("mongoose").SchemaDefinitionProperty<number, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    locked_until?: import("mongoose").SchemaDefinitionProperty<Date | null, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    last_failed_ip?: import("mongoose").SchemaDefinitionProperty<string | null, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    last_failed_user_agent?: import("mongoose").SchemaDefinitionProperty<string | null, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    last_failed_at?: import("mongoose").SchemaDefinitionProperty<Date | null, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    unlock_reason?: import("mongoose").SchemaDefinitionProperty<string | null, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    unlocked_at?: import("mongoose").SchemaDefinitionProperty<Date | null, AccountLockout, Document<unknown, {}, AccountLockout, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccountLockout & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AccountLockout>;
