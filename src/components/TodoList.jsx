import React from 'react';
import axios from 'axios';

class TodoList extends React.Component{


    componentDidMount(){
        this.getAllItems();
    }
    render(){
        return(
            <div className="col-12">
                <h1>YOO</h1>
            </div>
        );
    }

    getAllItems(){
        return axios.get(`http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/all`)
        .then(response=>{
            //this.setState({item:response.data})
            console.log(response.data)
        });
    }
} 

export default TodoList;