import { Request, Response } from "express";
import {AlunoService} from "../service/AlunoService"
import { promises } from "dns";

export class AlunoController {

    private AlunoService: AlunoService;

    constructor () {
        this.AlunoService = new AlunoService();
    }
    
    async get(req: Request, res: Response): Promise<Response> {
        const aluno = await this.AlunoService.getAll();
        return res.json(aluno);
    }

    async post(req: Request, res: Response): Promise<Response> {
        const { ra, nome, email } = req.body;
        const novoAluno = await this.AlunoService.create({email, nome, ra});
        return res.status(201).json(novoAluno);
    }

    put (req: Request, res: Response): Response {
        const ra = req.params.ra;
        // const alunoIndex =  this.alunos.findIndex(a => a.ra == ra)

        // if (alunoIndex > -1){
        //     const { nome} = req.body;

        //     this.alunos[alunoIndex] = { ra: ra, nome: nome };
        //     return res.json({ ra: ra, nome: nome});
        // } else {
        //     return res.status(404).json({ message: "Aluno não encontrado" });
        // }
        return res.json
    }
}

