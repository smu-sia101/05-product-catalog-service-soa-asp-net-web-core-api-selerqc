using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace product_catalog.Model
{
    public class Product
    {
        [BsonId]
        [Required]
        public string Id { get; set; }

        [BsonElement("Name")]
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [BsonElement("Price")]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [BsonElement("Description")]
        [StringLength(500)]
        public string Description { get; set; }

        [BsonElement("Category")]
        [StringLength(50)]
        public string Category { get; set; }

        [BsonElement("Stock")]
        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        [BsonElement("ImageUrl")]
        [Url]
        public string ImageUrl { get; set; }
    }
}
