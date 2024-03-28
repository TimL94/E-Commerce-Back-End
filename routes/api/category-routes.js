const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'] 
      },
    });

    res.json(categoryData);

    } catch (error) {
      console.error('Error fetching categories', error);
      res.status(500).json({ error: 'Failed to fetch categories'});
    }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    });
    if (!categoryData) {
      const resStatus = res.status(404).json({ message: `No category with id: ${req.params.id}`});
      const consoleError = console.error(`No category with id: ${req.params.id}`);
      return resStatus, consoleError;
      
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({error: `failed to fetch category by id: ${req.params.id}`, error});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: `no category with id: ${req.params.id}`})
      return
    }
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: `no category with id: ${req.params.id}`})
      return
    }
    res.status(200).json({ message: `category with id ${req.params.id} deleted`})
  } catch (error){
    res.status(500).json(error);
    console.error(error);
  }
});

module.exports = router;
