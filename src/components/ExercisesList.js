import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props =>(
    <tr>
        <td>{props.exercises.username}</td>
        <td>{props.exercises.description}</td>
        <td>{props.exercises.duration}</td>
        <td>{props.exercises.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercises._id}>Edit</Link>  | <a href="#" onClick={() => {props.deleteExercise(props.exercises._id)}}>Delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    componentDidMount (){
        axios.get('http://localhost:5000/exercise/')
        .then(response => {
            this.setState({ exercises : response.data})
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercise/'+id)
        .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList (){
        return this.state.exercises.map(currentexercise =>{
            return <Exercise 
                exercises={currentexercise} 
                deleteExercise={this.deleteExercise}
                key={currentexercise._id}
            />
        })
    } 


    render () {
        return(
            <div>
                <h3>Logged exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Descritpion</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}