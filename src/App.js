import React, { Component } from 'react';
import FoodBox from './foodbox/FoodBox.js';
import foods from './foods.json';
import './App.css'
import 'bulma/css/bulma.css';





class App extends Component {
  state = {
    foodList: foods,
    showForm: false,
    todaysFood: []
  }
  
  displayFood = () =>{
    let arr=this.state.foodList.map(food=>{
      return  <FoodBox 
                      key={food.name}
                      name={food.name}  
                      cal={food.calories}
                      img={food.image}
                      theClikedFoodProp={this.clickedFood}
     S                 />
    })
    return arr
  }

  displayTodaysFood = () =>{
    let arr=this.state.todaysFood.map(food=>{
      return (
        <li key={food.name}>{food.name} {food.calories}</li>
      )
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
    //copy previous list and add newFood
    let foodListCopy=[...this.state.foodList]
    foodListCopy.unshift(newFoodObj)
    
    this.setState({
      foodList: foodListCopy
    })
  }

  clickedFood = (food) =>{
    let newTodaysFood=[...this.state.todaysFood]
    newTodaysFood.push(food)
    this.setState({
      todaysFood: newTodaysFood
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

  searchList=(event)=>{
    // console.log("typing..",event.target.value)
    let filterFoods=foods.filter(eachFood=>{
      return eachFood.name.toLowerCase().includes(event.target.value)
    })
    this.setState({
      foodList: filterFoods
    })
    // console.log()
  }



  render(){
    return <div className='App'>
            <br />
            <input onChange={this.searchList} placeholder="search" />
            <button onClick={this.toggleForm}>Add Food</button>
            {this.state.showForm? <h1>Form</h1> : this.displayForm()}
            <ul>{this.displayTodaysFood()}</ul>
            <ul>{this.displayFood()}</ul>
          </div>
  }//end render
}//end class

export default App;