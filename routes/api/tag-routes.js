const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: ProductTag // Include the association through ProductTag model
        }
      ]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: ProductTag
        }
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: `no tag with id: ${req.params.id}`});
      return
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json({ error: `failed to retrieve tag with id: ${req.params.id}`})
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });
    if (!tagData[0]) {
      res.status(404).json({ message: `no tag with id: ${req.params.id}`})
      return
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: `no tag with id: ${req.params.id}`})
      return
    }
    res.status(200).json({ message:`tag with id ${req.params.id} deleted`})
 } catch (error) {
  res.status(500).json(error);
 }
});

module.exports = router;
