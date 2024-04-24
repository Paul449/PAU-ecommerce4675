const router = require('express').Router();
const { where } = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint
router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagsData = await Tag.findAll({
      include:[{model:Product}]
    })
    res.status(200).json(tagsData);
  }
  catch(error){
  res.status(500).json(error);
  }
});
router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagsID = await ProductTag.findByPk(req.params.id,{
      include:[{model:Product}]
    })
    if(tagsID !== true){
    res.status(404).json({});
    return;
    }
    res.status(200).json(tagsID);
  }
  catch(error){
    res.status(400).json(error);
  }
});
router.post('/', async(req, res) => {
  // create a new tag
  try{
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  }
  catch(error){
  }
});
router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagName = await Tag.update(req.body,{
      where:[{id:req.params.id}]
    })
    if(tagName !== true){
      res.status(404).json({message:'tag name not found'})
      return;
    }
    res.status(200).json(tagName);
  }
  catch(error){
  res.status(400).json(error);
  }
});
router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({
      where:[{id: req.params.id}]
    })
    if(deleteTag !== true){
      res.status(404).json({message:"Not tags has been found"})
      return;
    }
    res.status(200).json(deleteTag);
  }
  catch(error){
    res.status(500).json(error);
  }
});
module.exports = router;
