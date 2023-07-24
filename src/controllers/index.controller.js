import {pool} from '../db.js'

export const ping = async (req,res) => {
    try{
        res.json('pong')
    }
    catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}