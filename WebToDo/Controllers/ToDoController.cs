using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebToDo.Models;

namespace WebToDo.Controllers
{
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        static readonly List<ToDoItem> data;
        static ToDoController()
        {
            data = new List<ToDoItem>
            {
                new ToDoItem { Id = Guid.NewGuid().ToString(), Text="codingffg", Status=true },
                new ToDoItem { Id = Guid.NewGuid().ToString(), Text="reading", Status=false },
            };
        }
        [HttpGet]
        public IEnumerable<ToDoItem> Get()
        {
            var list = new List<ToDoItem>();
            list.AddRange(data.Where(task => task.Status == false));
            list.AddRange(data.Where(task => task.Status == true));
            return list;
        }

        [HttpPost]
        public IActionResult Post(ToDoItem toDoItem)
        {
            toDoItem.Id = Guid.NewGuid().ToString();
            data.Add(toDoItem);
            return Ok(toDoItem);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            ToDoItem toDoItem = data.FirstOrDefault(x => x.Id == id);
            if (toDoItem == null)
            {
                return NotFound();
            }
            data.Remove(toDoItem);
            return Ok(toDoItem);
        }

        [HttpPost]
        [Route("changestatus/{id}")]
        public IActionResult ChangeStatus(string id)
        {
            var status = data.FirstOrDefault(x => x.Id == id).Status;
            if (status)
            {
                data.FirstOrDefault(x => x.Id == id).Status = false;
            }
            else
            {
                data.FirstOrDefault(x => x.Id == id).Status = true;
            }
            return Ok();
        }
    }
}
