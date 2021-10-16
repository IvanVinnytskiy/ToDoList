function ToDoItem(props) {

    const refData = React.useRef(props.todoitem);
   
    function onClick(e) {
        props.onRemove(props.todoitem);
    }

    function onChangeToDo(e) {
        props.onChange(props.todoitem);
    }

    const resolvedClass = {
        textDecoration: 'line-through'
    }

    return (
        <div className="group-item list-group-item list-group-item-warning">
            <span className="text-item" style={props.todoitem.status == true ? resolvedClass : {}}>
                {refData.current.text}
            </span>
            <input className="status-item"
                type="checkbox"
                defaultChecked={refData.current.status}
                 onChange={onChangeToDo}
            />
            <button className="button-item btn btn-danger" onClick={onClick}>Delete</button>
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
            const data = new FormData();
            data.append("text", todoitem.textt);
            data.append("status", todoitem.statuss);
            var xhr = new XMLHttpRequest();
            xhr.open("post", props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    loadData();
                }
            };
            xhr.send(data);
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

    return (
        <div className="main well col-xs-3">
            <ToDoForm onToDoItemSubmit={onAddToDoItem} />
            <h2>To Do List</h2>
            <div className="list-group">
                {
                    todoitems.map(function (todoitem) {
                        return <ToDoItem key={todoitem.id} todoitem={todoitem} onRemove={onRemoveToDoItem} onChange={onChangeStatusToDoItem} />
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
        props.onToDoItemSubmit({ textt: todoitemText, statuss: todoitemStatus });
        setText("");
        setStatus(false);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control"
                    placeholder="ToDoItem"
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