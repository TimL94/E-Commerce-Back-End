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
      console.error('Error fetching catefories', error);
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

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
