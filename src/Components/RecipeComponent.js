import styled from 'styled-components'

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 30px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

export const CoverImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

export const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

export const IngredientsText = styled.span`
  font-size: 18px;
  color: green;
  border: solid 1px green;
  margin: 10px 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 12px;
`;

export const SeeMoreText = styled(IngredientsText)`
  color: red;
  border: solid 1px red;
`;