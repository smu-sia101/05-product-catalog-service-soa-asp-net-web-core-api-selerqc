using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using product_catalog.Model;
using System.Collections.Generic;
using System.Linq;

namespace product_catalog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly MongoDBContext _context;

        public ProductsController(MongoDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _context.Products.Find(product => true).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> Get(string id)
        {
            var product = _context.Products.Find<Product>(product => product.Id == id).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public ActionResult<Product> Post(Product product)
        {
            _context.Products.InsertOne(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, Product product)
        {
            var existingProduct = _context.Products.Find<Product>(p => p.Id == id).FirstOrDefault();
            if (existingProduct == null)
            {
                return NotFound();
            }

            _context.Products.ReplaceOne(p => p.Id == id, product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var product = _context.Products.Find<Product>(p => p.Id == id).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.DeleteOne(p => p.Id == id);
            return NoContent();
        }
    }
}
