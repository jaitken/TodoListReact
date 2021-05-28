import React from 'react';
import axios from 'axios';

import './TodoList.css'
import AddComponent from '../AddComponent/AddComponent';


class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            items: [],
            updated: true,
            bNewestFirst: false
        }
        
        this.clear = this.clear.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.reverseOrder = this.reverseOrder.bind(this);
        this.getAllItems = this.getAllItems.bind(this);

        this.test = this.test.bind(this);
    }

    componentDidMount(){
        this.getAllItems();
    }

    renderSwitch(){
        if(this.state.items.length > 0){
            const todoList = this.state.items.map(item =>{
                return(
                    <div className="item">
                        <h2>{item.title}</h2>
                        <div>
                            {item.thingsToDo.map((task)=>(
                                <h5>{task}</h5>
                            ))}
                        </div>
                        <button onClick={this.deleteItem.bind(this, item.id)} className='deleteButton'>Delete</button>
                    </div>
                );
            });
            return(
                <div>
                    <button onClick={this.reverseOrder}>Reverse</button>
                    <button onClick={this.clear}>Delete All</button>
                    {todoList}
                </div>
            );
        }else{
            return(
                <div>
                </div>
            );
        }
    }
    render(){
        return(
            <div className='todoList'>
                <AddComponent functionRefresh={this.getAllItems}/>
                {this.renderSwitch()}
            </div>
        )
    }

    async getAllItems(){
        console.log("getAllItems");
        await axios.get(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/all`)
            .then(response =>{
                this.setState({items:response.data})
            });

        if(this.state.bNewestFirst){
            let arr = this.state.items;
            arr.reverse();
            this.setState({items:arr})
        }
    }

    async deleteItem(id){
        await axios.delete(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/delete/${id}`);
        this.getAllItems();
    }

    async clear(){
        await axios.delete(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/deleteAll`);
        this.getAllItems();
    }


    reverseOrder(){
        this.setState({bNewestFirst: !this.state.bNewestFirst});
        this.getAllItems();
    }

    async test(){
        console.log('test');
    }
} 

export default TodoList;