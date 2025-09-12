import {AlunoRepository} from '../repositores/AlunoRepositore';
import {AlunoAttributes} from '../models/Aluno';

export class AlunoService {
    private alunoRepository: AlunoRepository;

    constructor() {
        this.alunoRepository = new AlunoRepository();
    }

    async create(aluno: Omit<AlunoAttributes, 'id'>){
        const alunoExistente = await this.alunoRepository.findByRA(aluno.ra);
        if(alunoExistente){
            throw new Error("Ra já existete");
        }

        return await this.alunoRepository.create(aluno);
    }

    async getAll(){
        return await this.alunoRepository.findAll();
    }
}