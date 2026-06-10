import { Document } from 'mongoose';
export type SituationDocument = Situation & Document;
export declare class ScriptItem {
    speaker_name: string;
    content_jp: string;
    content_vn: string;
    start_time: number;
    end_time: number;
    order_index: number;
}
export declare const ScriptItemSchema: import("mongoose").Schema<ScriptItem, import("mongoose").Model<ScriptItem, any, any, any, any, any, ScriptItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ScriptItem, Document<unknown, {}, ScriptItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    speaker_name?: import("mongoose").SchemaDefinitionProperty<string, ScriptItem, Document<unknown, {}, ScriptItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content_jp?: import("mongoose").SchemaDefinitionProperty<string, ScriptItem, Document<unknown, {}, ScriptItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content_vn?: import("mongoose").SchemaDefinitionProperty<string, ScriptItem, Document<unknown, {}, ScriptItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    start_time?: import("mongoose").SchemaDefinitionProperty<number, ScriptItem, Document<unknown, {}, ScriptItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    end_time?: import("mongoose").SchemaDefinitionProperty<number, ScriptItem, Document<unknown, {}, ScriptItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    order_index?: import("mongoose").SchemaDefinitionProperty<number, ScriptItem, Document<unknown, {}, ScriptItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ScriptItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ScriptItem>;
export declare class Situation {
    title_vn: string;
    title_jp: string;
    main_audio_url: string;
    duration: number;
    scripts: ScriptItem[];
}
export declare const SituationSchema: import("mongoose").Schema<Situation, import("mongoose").Model<Situation, any, any, any, any, any, Situation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Situation, Document<unknown, {}, Situation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Situation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title_vn?: import("mongoose").SchemaDefinitionProperty<string, Situation, Document<unknown, {}, Situation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Situation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title_jp?: import("mongoose").SchemaDefinitionProperty<string, Situation, Document<unknown, {}, Situation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Situation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    main_audio_url?: import("mongoose").SchemaDefinitionProperty<string, Situation, Document<unknown, {}, Situation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Situation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, Situation, Document<unknown, {}, Situation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Situation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    scripts?: import("mongoose").SchemaDefinitionProperty<ScriptItem[], Situation, Document<unknown, {}, Situation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Situation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Situation>;
