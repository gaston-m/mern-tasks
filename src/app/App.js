import React, { Component }  from 'react';

class App extends Component {

    constructor () {

        super();

        this.state = {

            title: '',
            description: '',
            tasks: [],
            _id: ''
        }

        this.manejador = this.manejador.bind(this);
        this.addTask = this.addTask.bind(this);

    }


    componentDidMount() {

        this.fetchTasks();
    }

    fetchTasks () {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ tasks: data}) 
            })
    }


    addTask(e){
        if (this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
    
                    'Accept': 'application/json',
                    'Content-Type': 'application/json ' 
                }
            })
            .then(res => res.json())
            .then (data => {
                console.log(data);
                M.toast({ html: 'Tarea Actualizada'})
            })
            this.fetchTasks();

        } else {

            fetch('/api/tasks/new', {

                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
    
                    'Accept': 'application/json',
                    'Content-Type': 'application/json ' 
                }
            })
            .then(res => res.json())
            .then (data => {console.log(data)
                M.toast({html: 'Tarea Guardada'});
                this.setState({ title:'', description: ''});
                this.fetchTasks();
    
            })
            .catch(err => console.error(err));
            e.preventDefault();

        }

    }

    manejador(e) {

        const { name, value } = e.target;
        this.setState({

            [name]: value
        })
    }

    deleteTask(id){
        if (confirm('Estas seguro de que quieres eliminar la Tarea?'))
        {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                'Accept': 'application/json',
                'Content-Type': 'application/json ' 
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Eliminada'});
            })
            this.fetchTasks();


        }
    }

    updateTask(id){

            fetch(`/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        title: data.title,
                        description: data.description,
                        _id: data._id
                    });
                });
    };

    render(){

        return (

            <div>
                  {/*   Navegacion   */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href='/'>MERN TASKS</a>

                    </div>    
                </nav> 

                <div className="container">
                    <div className="row">
                        <div className="col s7">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="title" onChange={this.manejador} placeholder="Titulo" value={this.state.title}autoFocus/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.manejador} className="materialize-textarea" placeholder="Descripcion" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">Guardar</button>
                                    </form>
                                </div>
                            </div>    
                        </div>

                        <div className="col s5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map( task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                     <div>   
                                                      <button className="btn light-blue darken-4" onClick={() => this.updateTask(task._id)} style={{margin: "4px 4px"}}>  
                                                        <i className="material-icons">edit</i>
                                                      </button>  
                                                      <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)} style={{margin: "4px 4px"}}>  
                                                        <i className="material-icons">delete</i>
                                                      </button>  
                                                     </div> 
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>   
                            </table>
                        </div>    
                    </div>
                </div>   

            </div>

        );
    }
}

export default App;