import React from 'react';
import styled from 'styled-components';
const Title = styled.h1`
 color: Gainsboro;
 text-align: center;
 border: 2px solid white;
 
 padding: 10px 0;
 text-transform: uppercase;
 background: maroon
 
`
const HomePage = () => {
    return (
        <div>
        <Title>Welcome to the best GOT Wiki</Title>
        </div>
    )
}
export default HomePage