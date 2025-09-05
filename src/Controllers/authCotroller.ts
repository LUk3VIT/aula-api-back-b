import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPIX';

interface loginUser {
    id: number;
    email: string;
    senha: string;
    nome: string;
}

export class AuthController {
    private users: loginUser[] = [];

    async registro(req: Request, res: Response): Promise<Response>{
        const {nome, senha, email} = req.body;
        
        if (!nome || !email || !senha){
            return res.status(400).json({mensagem: 'Informe todos os campos'});
        }

        const usuarioExistente = this.users.find(u => u.email === email);
        if (usuarioExistente){
            return res.status(400).json({mensagem: 'tem existe alguem com esse email'});
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario: loginUser = {
            id: this.users.length + 1,
            nome,
            email,
            senha: senhaHash
        };

        this.users.push(novoUsuario);
        return res.status(201).json({mensagem: 'Usuario Criado!'})
    }
    
    async login (req:Request, res: Response): Promise<Response>{
        const {email, senha} = req.body;

        // TODA VALIDADEÇÃO EU VOU FAZER DEPOIS

        const usuario = this.users.find(u => u.email === email);
        if (!usuario){
            return res.status(401).json({mensagem: 'não vai subir Ninguem !!!'})
        }
        
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida){
            return res.status(401).json({mensagem: 'SHiIIIIII'})
        }

        const token = jwt.sign(
            {nomeFulano: usuario.nome},
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({token: token });
    }
}    
