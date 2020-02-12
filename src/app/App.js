import React, { Component }  from 'react';

class App extends Component {

    render(){

        return (

            <div>
                  {/*   Navegacion   */}
                <nav clasName="blue darken-1">
                    <div className="container">
                        <a className="brand-logo" href='/'>MERN TASKS</a>

                    </div>    
                </nav> 

                <div className="Container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                </div>
                            </div>    
                        </div>

                        <div className="col s7">
                    
                        </div>    
                    </div>
                </div>   

            </div>

        );
    }
}

export default App;