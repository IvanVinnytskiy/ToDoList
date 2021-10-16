using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebToDo.Models
{
    public class ToDoItem
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public bool Status { get; set; }
    }
}
