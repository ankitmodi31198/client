import React, { Component } from 'react';

import GetMyRecipes from './MyRecipesComponents/GetMyRecipes';
import MakeNewRecipe from './MyRecipesComponents/MakeNewRecipe';

class MyRecipes extends Component {
    state = {
        MakeNewRecipe: false,
        GetMyRecipes: true
    }
    getMyRecipes = () => {
        this.setState({GetMyRecipes: true, MakeNewRecipe: false})
    }
    makeNewRecipe = () => {
        this.setState({GetMyRecipes: false, MakeNewRecipe: true})
    }
    render() { 
        return (
            <React.Fragment>
                {this.state.MakeNewRecipe ? (<MakeNewRecipe getMyRecipes={this.getMyRecipes} />) : (null)}
                {this.state.GetMyRecipes ? (<GetMyRecipes makeNewRecipe={this.makeNewRecipe} />) : (null)}                
            </React.Fragment>
        );
    }
}
 
export default MyRecipes;