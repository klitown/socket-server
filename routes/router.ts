import { Router, Request, Response } from "express";

const router = Router();


// Peticion GET
router.get( '/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mensaje: 'Codigo 200: GET Ejecutado correctamente'
    });
});


// Peticion POST
router.post( '/mensajes', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post( '/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});




export default router;