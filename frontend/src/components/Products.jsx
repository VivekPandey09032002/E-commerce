import { Container } from "@chakra-ui/react";
import React, { useState } from "react";


function Products({products}) {


  return (
    <Container maxW="container.lg">
      {products.map((product, ind) => (
        <div key={ind}>
          <img src="https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_02_l.jpg" />
        </div>
      ))}
    </Container>
  );
}

export default Products;
