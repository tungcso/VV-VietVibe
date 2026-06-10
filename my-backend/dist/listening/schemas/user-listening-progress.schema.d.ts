import { Document, Types } from 'mongoose';
export type UserListeningProgressDocument = UserListeningProgress & Document;
export declare class UserListeningProgress {
    user_id: Types.ObjectId;
    situation_id: Types.ObjectId;
    highest_progress_seconds: number;
    is_completed: boolean;
}
export declare const UserListeningProgressSchema: import("mongoose").Schema<UserListeningProgress, import("mongoose").Model<UserListeningProgress, any, any, any, any, any, UserListeningProgress>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserListeningProgress, Document<unknown, {}, UserListeningProgress, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<UserListeningProgress & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user_id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, UserListeningProgress, Document<unknown, {}, UserListeningProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UserListeningProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    situation_id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, UserListeningProgress, Document<unknown, {}, UserListeningProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UserListeningProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    highest_progress_seconds?: import("mongoose").SchemaDefinitionProperty<number, UserListeningProgress, Document<unknown, {}, UserListeningProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UserListeningProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    is_completed?: import("mongoose").SchemaDefinitionProperty<boolean, UserListeningProgress, Document<unknown, {}, UserListeningProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UserListeningProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, UserListeningProgress>;
