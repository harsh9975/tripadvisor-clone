require("dotenv").config();
const { validationResult } = require("express-validator");
const db = require("../config/dbConnection");

const createPlaces = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {placesName,desc,details} = req.body;
  db.query(
    `INSERT INTO places (places_name,description,details) VALUES('${placesName}','${desc}','${details}')`,
    function(error,result){
        console.log("error",error)
        if(error){
            return res.status(400).send({
                message: error,
              });
        }
        console.log("result",result)
        if(result){
            if(req.file?.location !== undefined) {
                db.query(
                    `INSERT INTO places_images (places_id,image) VALUES('${result.insertId}','${req.file?.location}')`,
                    function(error,result){
                        console.log("cehck1",error)
                        if(error){
                            return res.status(400).send({
                                message: error,
                              });
                        }
                        if(result){
                            return res.status(200).send({
                                message: "Places created successfully",
                                // url:req.file?.location
                              });
                        }
                    }
                )

            }else{
                return res.status(200).send({
                    message: "Places created successfully",
                  });
            }
            
        }
        
    }
  )
};

const getPlacesById = (req,res) =>{
    try{
        db.query(
            `SELECT * from places WHERE places_id=?`,
            req.params.id,
            function(error,result){
                if(error){
                    return res.status(400).send({
                        message:error
                    })
                }
                if(result){
                    let place = result[0];
                    db.query(
                        `SELECT * from places_images WHERE places_id=?`,
                        req.params.id,
                        function(error,results){
                            return res.status(200).send({
                                message:"Fetched Successfully",
                                places:{...place,url:results}
                            })
                        }
                    )
                }
            }
        )
    }
    catch(error){
        return res.status(400).send({
            message:error
        })
    }
    console.log(req.params)
    
}

const getAllPlaces = (req,res)=>{
    try{
        const sql = req.query.search === "" ? `SELECT * from places` : `SELECT * FROM places WHERE places_name LIKE ('%${req.query.search}%')`
        db.query(
            sql,
            function(error,result){
                if(error){
                    return res.status(400).send({
                        message:error
                    })
                }
                if(result){
                    return res.status(200).send({
                        message:result
                    })
                }
            }
        )

    }catch(error){
        return res.status(400).send({
            message:error
        })
    }
}

const updatePlaces = (req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const sql = `UPDATE places
  SET places_name = '${req.body.placesName}', description = '${req.body.desc}', details = '${req.body.details}'
  WHERE places_id = ${req.body.id};`
  try{
    db.query(
        sql,
        function(error,result){
            if(error){
                return res.status(400).send({
                    message:error
                  })
            }
            if(result){
                return res.status(200).send({
                    message:"Updated successfully",
                    place:result[0]
                })
            }
        }
    )

  }
  catch(error){
    return res.status(400).send({
        message:error
      })

  }
}

const deletePlaces = (req,res) =>{
    try{
        console.log(req.params.id)
        var sql = 'DELETE FROM places WHERE places_id = ?';
        db.query(sql,[req.params.id],
            function(error,result){
                console.log("error",error)
                if(error){
                    return res.status(400).status({
                        message:error
                    })
                }
                    return res.status(200).status({
                        message:"Deleted Successfully"
                    })
                
            })

    }catch(error){
        return res.status(400).status({
            message:error
        })
    }
}


module.exports = {
  createPlaces,
  getPlacesById,
  getAllPlaces,
  updatePlaces,
  deletePlaces
};
