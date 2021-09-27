const fs = require('fs');

module.exports.getEntities = (req, res) => {
  const entites = getEntityData()
  res.send(entites)
}

/* Create - POST method */
module.exports.createEntity = (req, res) => {
  //get the existing user data
  const existEntities = getEntityData()
  
  //get the new user data from post request
  const entityData = req.body
  //check if the userData fields are missing
  if (
    entityData.id == null || 
    entityData.phoneNumber == null || 
    entityData.email == null || 
    entityData.firstName == null || 
    entityData.lastName == null
  ) {
      return res.status(401).send({error: true, msg: 'Entity data missing'})
  }
  
  //check if the username exist already
  const findExist = existEntities.find( ent => ent.id === entityData.id )
  if (findExist) {
      return res.status(409).send({error: true, msg: 'entity already exist'})
  }
  //append the user data
  existEntities.push(entityData)
  //save the new user data
  saveEntityData(existEntities);
  res.send({success: true, msg: 'Entity data added successfully'})
}

/* Update - Patch method */
module.exports.changeEntity = (req, res) => {
  //get the id from url
  const entityId = parseInt(req.params.entity_id)
  //get the update data
  const entityData = req.body
  //get the existing data
  const existEntities = getEntityData()
  //check if the entity exist or not       
  const findExist = existEntities.find( ent => ent.id === entityId )
  if (!findExist) {
    return res.status(409).send({error: true, msg: 'entity not exist'})
  }
  //filter the data
  const updateEntity = existEntities.filter( ent => ent.id !== entityId )
  //push the updated data
  updateEntity.push(entityData)
  //finally save it
  saveEntityData(updateEntity)
  res.send({success: true, msg: 'Entity data updated successfully'})
}

/* Delete - Delete method */
module.exports.removeEntity = (req, res) => {
  const entityId = parseInt(req.params.entity_id)
  //get the existing data
  const existEntities = getEntityData()
  //filter the data to remove it
  const filterEntities = existEntities.filter( ent => ent.id !== entityId )
  if ( existEntities.length === filterEntities.length ) {
      return res.status(409).send({error: true, msg: 'entity does not exist'})
  }
  //save the filtered data
  saveEntityData(filterEntities)
  res.send({success: true, msg: 'Entity removed successfully'})   
}

const saveEntityData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('public/entities.json', stringifyData)
}
//get the user data from json file
const getEntityData = () => {
  const jsonData = fs.readFileSync('public/entities.json')
  return JSON.parse(jsonData)    
}