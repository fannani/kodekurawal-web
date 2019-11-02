import React, {useEffect, useState} from 'react';
import Card from "../../components/UI/Card";
import styled from "styled-components";

import HtmlToReact  from 'html-to-react';

const Title = styled.h5`
  margin-left:auto;
  margin-right:auto;
  margin-bottom:20px;
  margin-top:20px;
`

const Container = styled(Card)`
  padding:20px;
  margin-top:20px
  margin-bottom:80px
`
const Content = styled.div`
  padding-left:10px;
  padding-right:10px;
`
const Footer = styled.div`
  margin-top:10px;
`

const htmlToReactParser = new HtmlToReact.Parser();

const Material = ({ stage}) => {
  const content = htmlToReactParser.parse(stage.material.body);
  return (
    <Container className="card col-10 offset-1">
      <Title>{stage.title}</Title>
      <Content>
        { content }
      </Content>
      <Footer>
        <button style={{float:'right'}  }className="btn btn-primary" >Selesai</button>
      </Footer>
    </Container>
  )
}
export default Material
