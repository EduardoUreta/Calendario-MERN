import { model, Schema } from "mongoose";

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

export const UsuarioModel = model('Usuario', UsuarioSchema);