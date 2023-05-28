import { Alert, AlertDescription, AlertIcon, AlertTitle, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

function RenderError({second, primaryMsg, secondaryMsg}) {
  return (
    <>
      <Breadcrumb m={5} fontSize={25}>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to={"/" + second}>
            {second}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{primaryMsg} </AlertTitle>
        <AlertDescription>{secondaryMsg}</AlertDescription>
      </Alert>
    </>
  );
}

export default RenderError;
