import React from 'react';
import {FlatList} from 'react';

export const getData = () => {
    const response = fetch("http://opentable.herokuapp.com/api");
    const data =  response.json();
    console.log(data.cities);
    return (
      <FlatList>
        content = {data}
      </FlatList>
    )
}