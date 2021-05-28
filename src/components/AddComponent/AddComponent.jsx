import React from 'react';
import axios from 'axios';



class AddComponent extends React.Component{
    constructor(props){
        super(props);

        this.state={
           form : null
        };

        this.submit = this.submit.bind(this);
        this.refreshItems = this.refreshItems.bind(this);
    }

    componentDidMount(){
    }

    async submit(e) {
        e.preventDefault();
        const data = new FormData(document.getElementById('addForm'));
        var object = {};
        data.forEach(function(value, key){
            if(key === 'thingsToDo'){
                value = value.split(",")
                object[key] = value;
            }else{
                object[key] = value;
            }
            
        });
        await axios.post('http://todolistapi.eba-ikjufnsu.us-east-1.elasticbeanstalk.com/add', object);

        await this.refreshItems();
      }

    async refreshItems(){
        await this.props.functionRefresh();
    }
    render(){
        return(
            <div>
                <form ref={this.state.form} onSubmit={this.submit} id='addForm'>
                    <p>title:</p>
                    <input type="text" name="title" defaultValue='' />

                    <p>Todo:</p>
                    <input type="text" name="thingsToDo" defaultValue='' />

                    <input type="submit" name="submit" />
                </form>
            </div>
        )
    }

} 

export default AddComponent;