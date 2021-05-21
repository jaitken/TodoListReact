import React from 'react';
import axios from 'axios';

import './TodoList.css'

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            items: [],
            updated: true
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount(){
        this.getAllItems();
    }

    render(){
        const todoList = this.state.items.map(item =>{

            return(
                <div className="item">
                    <h2>{item.title}</h2>
                    <div>
                        {item.thingsToDo.map((task)=>(
                            <h5>{task}</h5>
                        ))}
                    </div>
                    <button onClick={this.deleteItem.bind(this, item.id)}>Delete</button>
                </div>
            );
        });
        return(
            <div className="col-12">
                {todoList}
                <button onClick={this.clear}>Delete All</button>
            </div>
        );
    }

    getAllItems(){
        axios.get(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/all`)
            .then(response=>{
                this.setState({items:response.data})
                console.log(this.state.items);
            });
    }

    async deleteItem(id){
        await axios.delete(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/delete/${id}`);
        this.getAllItems();
    }

    async clear(){
        await axios.delete(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/deleteAll`);
        this.getAllItems();
    }
} 

export default TodoList;