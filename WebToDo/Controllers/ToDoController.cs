using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WebToDo.Models;
using WebToDo.Services;

namespace WebToDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService;

        public ToDoController(ToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [HttpGet]
        public ActionResult<List<ToDoItem>> Get() =>
            _toDoService.Get();

        [HttpGet("{id:length(24)}", Name = "GetToDoItem")]
        public ActionResult<ToDoItem> Get(string id)
        {
            var toDoItem = _toDoService.Get(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            return toDoItem;
        }

        [HttpPost]
        public ActionResult<ToDoItem> Post(ToDoItem toDoItem)
        {
            _toDoService.Create(toDoItem);

            CreatedAtRoute("GetToDoItem", new { id = toDoItem.Id.ToString() }, toDoItem);
            return Ok(toDoItem);
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var toDoItem = _toDoService.Get(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            _toDoService.Remove(toDoItem.Id);

            return Ok(toDoItem);
        }

        [HttpPost("changestatus/{id:length(24)}")]
        public IActionResult Update(string id)
        {
            var toDoItem = _toDoService.Get(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            if (toDoItem.Status)
            {
                toDoItem.Status = false;
            }
            else
            {
                toDoItem.Status = true;
            }

            _toDoService.Update(id, toDoItem);

            return Ok(toDoItem);
        }

        [HttpPost("changetask/")]
        public IActionResult UpdateTask(ToDoItem toDoItem)
        {
            _toDoService.Update(toDoItem.Id, toDoItem);
            return Ok(toDoItem);
        }
    }
}
