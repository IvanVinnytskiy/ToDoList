using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using WebToDo.Models;

namespace WebToDo.Services
{
    public class ToDoService
    {
        private readonly IMongoCollection<ToDoItem> _toDoItems;

        public ToDoService(IToDiListDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _toDoItems = database.GetCollection<ToDoItem>(settings.ToDoItemsCollectionName);
        }

        public List<ToDoItem> Get() =>
            _toDoItems.Find(toDoItem => true).SortBy(x => x.Status).ToList();
        
        public ToDoItem Get(string id) =>
            _toDoItems.Find(toDoItem => toDoItem.Id == id).FirstOrDefault();

        public ToDoItem Create(ToDoItem toDoItem)
        {
            _toDoItems.InsertOne(toDoItem);
            return toDoItem;
        }

        public void Update(string id, ToDoItem toDoItemIn) =>
            _toDoItems.ReplaceOne(toDoItem => toDoItem.Id == id, toDoItemIn);

        public void Remove(ToDoItem toDoItemIn) =>
            _toDoItems.DeleteOne(toDoItem => toDoItem.Id == toDoItemIn.Id);

        public void Remove(string id) =>
            _toDoItems.DeleteOne(toDoItem => toDoItem.Id == id);
    }
}
