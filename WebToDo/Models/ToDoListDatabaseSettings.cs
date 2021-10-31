namespace WebToDo.Models
{
    public class ToDoListDatabaseSettings : IToDiListDatabaseSettings
    {
        public string ToDoItemsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IToDiListDatabaseSettings
    {
        string ToDoItemsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
