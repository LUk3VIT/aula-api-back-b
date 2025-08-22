import {Router} from "express";
import { AlunoController } from "../Controllers/alunoControllres";


const alunoRouter = Router(); 
const alunoController = new AlunoController();

alunoRouter.get("/", (req, res) => alunoController.get(req,res));
alunoRouter.post("/", (req,res) => alunoController.post(req,res));
alunoRouter.post("/:ra", (req,res) => alunoController.put(req,res));

export default alunoRouter;