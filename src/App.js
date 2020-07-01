import React, { Component } from 'react';
import FoodBox from './foodbox/FoodBox.js';
import foods from './foods.json';
import './App.css'
import 'bulma/css/bulma.css';





class App extends Component {
  state = {
    foodList: foods,
    showForm: false,
    foodName: '',
    calories: 0,
    image: ''
  }
  
  displayFood = () =>{
    let arr=this.state.foodList.map(food=>{
      return  <FoodBox 
                      key={food.name}
                      name={food.name}  
                      cal={food.calories}
                      img={food.image}
                      />
    })
    return arr
  }

  toggleForm = () =>{
    this.setState({showForm: !this.state.showForm});
  };

  addFood=(event)=>{
    event.preventDefault();
    let newFoodObj={
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.image,
      quantity: 0
    }

    let foodListCopy=[...this.state.foodList]
    foodListCopy.unshift(newFoodObj)
    
    this.setState({
      foodList: foodListCopy
    })
  }


  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  displayForm = () =>{
    return (
            <form onSubmit={this.addFood}>
              <label >Food Name: </label>
              <input onChange={this.handleChange} type='text' name='name'/>
              <br />
              <label >Calories: </label>
              <input onChange={this.handleChange} type='number' name='calories'/>
              <br />
              <label >Image URL: </label>
              <input onChange={this.handleChange} type='text' name='image'/>
              <br />
              <input type="submit" />
            </form>
    );
  };


  render(){
    return <div className='App'>
            <button onClick={this.toggleForm}>Add Food</button>
            {this.state.showForm? <h1>Form</h1> : this.displayForm()}
            {this.displayFood()}
          </div>
  }//end render
}//end class

export default App;