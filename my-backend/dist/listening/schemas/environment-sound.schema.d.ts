import { Document } from 'mongoose';
export type EnvironmentSoundDocument = EnvironmentSound & Document;
export declare class EnvironmentSound {
    name: string;
    audio_url: string;
}
export declare const EnvironmentSoundSchema: import("mongoose").Schema<EnvironmentSound, import("mongoose").Model<EnvironmentSound, any, any, any, any, any, EnvironmentSound>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EnvironmentSound, Document<unknown, {}, EnvironmentSound, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EnvironmentSound & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, EnvironmentSound, Document<unknown, {}, EnvironmentSound, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EnvironmentSound & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    audio_url?: import("mongoose").SchemaDefinitionProperty<string, EnvironmentSound, Document<unknown, {}, EnvironmentSound, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EnvironmentSound & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, EnvironmentSound>;
