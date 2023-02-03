import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Reservation(){
  const [products, setProducts] = useState([]);
  const [property, setProperty] = useState([]);

useEffect(() => {
  fetchProducts();
}, []);
const fetchProducts = () => {
 
  axios
    .get('/reservations/getR/6380144d6c5cba2b008983a0')
    .then((res) => {
      console.log(res);
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
function getPropertyDetails(property)
{
 const propertyID = property.reserved_property_id;
  console.log(propertyID);
  const getLink = "/properties/"+propertyID;
  console.log(getLink);
  axios
  .get(getLink)
  .then((res) => {
    console.log(res);
    //setProducts(res.data);
    window.propertyImage = res.data.property_image;
    setProperty(res.data.property_name);
    var propertyName = res.data.property_name;
    console.log(window.propertyImage);
    console.log(window.propertyName);
  })
  .catch((err) => {
    console.log(err);
  });


};
//getPropertyDetails('63718cd3e23c191d0365a9e3');
return (
    <div>
      <h1>Reserved Properties</h1>
      <div >
        {products.map((product) => (
          <div className='card' key={product.reserved_property_id} >
            {console.log('huhi')}
            {console.log({product})}
            {getPropertyDetails(product)}
            {console.log(window.propertyImage)}
            <h5>Property Name : {property}</h5>
            <h5> Reserved On: {product.reserved_date}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Reservation;