import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {UsuarioRepository} from '../repositores/UsuarioRepositore';
import { Usuario, UsuarioAttributes } from '../models/Usuario';

const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPIX';

export class AlunoService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async create(usuario: Omit<UsuarioAttributes, 'id'>){
        const usuarioExistente = await this.usuarioRepository.findByEmail(usuario.email);
        if(usuarioExistente){
            throw new Error("Email já existete");
        }

        const senhaHash = await bcrypt.hash(usuario.senha, 10);

        await this.usuarioRepository.create({
            email: usuario.email,
            nome: usuario.nome,
            senha: senhaHash
        });

        return {mensagem: 'Usuario Criado!'};
    }

    async login(email: string, senha: string){
        const usuario = await this.usuarioRepository.findByEmail(email);
        if (!usuario){
            throw new Error('Usuário ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida){
            throw new Error('Usuário ou senha inválidos');
        }

        const token = jwt.sign(
            {id: usuario.id, nome: usuario.nome},
            JWT_SECRET,
            {expiresIn: '1h'}
        )

        return {token};
    }
}