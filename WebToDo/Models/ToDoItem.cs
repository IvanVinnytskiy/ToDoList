using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebToDo.Models
{
    public class ToDoItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Text { get; set; }
        public bool Status { get; set; }
    }
}
