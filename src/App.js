import styled from 'styled-components';
import Axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Header,AppNameComponent,AppIcon,SearchIcon,SearchComponent,SearchInput} from './Components/HeaderComponent';
import {RecipeContainer,CoverImage,RecipeName,IngredientsText,SeeMoreText} from './Components/RecipeComponent';
import { useState } from 'react';

const APP_ID = "a40c4b7c";
const APP_KEY = "977513cf8f5e93259ad0c90cdf520cfb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;
  return(
   <> 
    <Dialog open = {show}>
    <DialogTitle>Ingredients</DialogTitle>
    <DialogContent>
    <RecipeName>{recipeObj.label}</RecipeName>
      <table>
        <thead>
          <th>Ingredient</th>
          <th>Weight</th>
        </thead>
        <tbody>
          {recipeObj.ingredients.map((ingredientObj) => (
            <tr>
            <td>{ingredientObj.text}</td>
            <td>{ingredientObj.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DialogContent>
    <DialogActions>
      <IngredientsText onClick={() => window.open(recipeObj.url)}>See More</IngredientsText>
      <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
    </DialogActions>
    </Dialog>
    <RecipeContainer>
      <CoverImage src = {recipeObj.image} />
      <RecipeName>{recipeObj.label}</RecipeName>
      <IngredientsText onClick={() => setShow(true)}>Ingredients</IngredientsText>
      <SeeMoreText onClick={() => window.open(recipeObj.url)}>See Complete Recipe</SeeMoreText>
    </RecipeContainer>
   </> 
  );
};

function App() {
  const [timeoutID, updateTimeoutID] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async(searchString) => {
    const response = await Axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutID);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 500);
    updateTimeoutID(timeout);
  };

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="/pizza.svg" />
            Recipe Finder
        </AppNameComponent>
        <SearchComponent>
          <SearchIcon src="/search.svg"/>
          <SearchInput placeholder="Search Recipe" onChange={onTextChange}/>
        </SearchComponent>
      </Header>
      <RecipeListContainer>
        {recipeList.length ? recipeList.map((recipeObj) => <RecipeComponent recipeObj ={recipeObj.recipe} />
        ) : <Placeholder src="pizza.svg" />}
      </RecipeListContainer>
    </Container>  
  );
}

export default App;
