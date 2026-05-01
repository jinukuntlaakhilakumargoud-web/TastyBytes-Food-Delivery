import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({ category }) => {

  const { food_list, searchQuery } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item) => {
          // Filter by category
          if (category !== "All" && category !== item.food_category) {
            return null;
          }
          // Filter by search query
          if (searchQuery && !item.food_name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
          }
          return <FoodItem key={item.food_id} image={item.food_image} name={item.food_name} desc={item.food_desc} price={item.food_price} id={item.food_id} />
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
