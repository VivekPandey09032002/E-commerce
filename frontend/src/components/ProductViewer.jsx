import { Card, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-rating-stars-component";
import {NavLink} from 'react-router-dom'

function ProductViewer({category,url,rating,price,name,id}) {
  return (
    <Link as={NavLink} to={`/product/${id}`}>
    <Card w={ { base : "full ", md :"280px"}} h= {{ base : "full", md :"280px"}} m={3} position="relative">
      <div className="box">
        <img src={url} alt="" loading="lazy" draggable="false"/>
        <div className="content">
            <div className="category">{category}</div>
            <div className="name">{name}</div>
        </div>
      </div>
      <Flex align="center" justify="space-around">
        <ReactStars
          count={5}
          activeColor="#ffd700"
          value={rating}
          size={25}
          isHalf={true}
          edit={false}
        />
        <Text as="p">Rs: {price}</Text>
      </Flex>
    </Card>
    </Link>
  );
}

export default ProductViewer;
