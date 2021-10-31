function ToDoItem(props) {

    const refData = React.useRef(props.todoitem);
    const [text, setText] = React.useState(refData.current.text);

    function onEditStatus(e) {
        props.onChangeStatus(props.todoitem);
    }

    function onEditText(e) {
        setText(e.target.value);
    }

    function onClickEdit(e) {
        props.onChangeText(props.todoitem, text)
    }

    function onClickDelete(e) {
        props.onRemove(props.todoitem);
    }

    const activeToDoItem = {
        color: 'green'
    }

    const inactiveToDoItem = {
        color: 'red',
        textDecoration: 'line-through'
    }

    return (
        <div className="group-item list-group-item list-group-item-warning">
            <input className="text-item"
                type="text"
                value={text}
                onChange={onEditText}
                style={props.todoitem.status == true ? inactiveToDoItem : activeToDoItem}
            />
            <input className="status-item"
                type="checkbox"
                defaultChecked={refData.current.status}
                onChange={onEditStatus}
            />
            <button className="button-item btn btn-warning" onClick={onClickEdit}>Edit</button>
            <button className="button-item btn btn-danger" onClick={onClickDelete}>Delete</button>
        </div>
    );
}

function ToDoList(props) {

    const [todoitems, setTodoitems] = React.useState([]);
    React.useEffect(() => {
        loadData();
    },
    []);
    
    function loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            setTodoitems(data);
        };
        xhr.send();
    }

    function onAddToDoItem(todoitem) {
        if (todoitem) {
            var xhr = new XMLHttpRequest();
            xhr.open("post", props.apiUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    loadData();
                }
            };
            xhr.send(JSON.stringify(todoitem));
        }
    }
    
    function onRemoveToDoItem(todoitem) {
        if (todoitem) {
            var url = props.apiUrl + "/" + todoitem.id;
            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    loadData();
                }
            };
            xhr.send();
        }
    }

    function onChangeStatusToDoItem(todoitem) {
        if (todoitem) {
            var url = props.apiUrl + "/changestatus/" + todoitem.id;
            var xhr = new XMLHttpRequest();
            xhr.open("post", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    loadData();
                }
            };
            xhr.send();
        }
    }

    function onChangeTextToDoItem(todoitem, text) {
        if (todoitem) {
            todoitem.text = text;
            var url = props.apiUrl + "/changetask/";
            var xhr = new XMLHttpRequest();
            xhr.open("post", url, true);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    loadData();
                }
            };
            xhr.send(JSON.stringify(todoitem));
        }
    }

    return (
        <div className="main well col-xs-3">
            <ToDoForm onToDoItemSubmit={onAddToDoItem} />
            <h2>To Do List</h2>
            <div className="list-group">
                {
                    todoitems.map(function (todoitem) {
                        return <ToDoItem key={todoitem.id} todoitem={todoitem} onRemove={onRemoveToDoItem} onChangeStatus={onChangeStatusToDoItem} onChangeText={onChangeTextToDoItem} />
                    })
                }
            </div>
        </div>
    );
}

function ToDoForm(props) {

    const [text, setText] = React.useState("");
    const [status, setStatus] = React.useState(false);

    function onTextChange(e) {
        setText(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        var todoitemText = text.trim();
        var todoitemStatus = status;
        if (!todoitemText) {
            return;
        }
        props.onToDoItemSubmit({ text: todoitemText, status: todoitemStatus });
        setText("");
        setStatus(false);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control"
                    placeholder="Your task"
                    value={text}
                    onChange={onTextChange}
                />
            </div>
            <button className="button-save btn btn-success">Save</button>
        </form>
    );
}

ReactDOM.render(
    <ToDoList apiUrl="/api/todo" />,
    document.getElementById("content")
);