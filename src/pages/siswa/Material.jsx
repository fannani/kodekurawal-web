import React, {useEffect, useState} from 'react';
import Card from "../../components/UI/Card";
import styled from "styled-components";
import HtmlToReact  from 'html-to-react';
import { Document, Page, pdfjs } from "react-pdf";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Title = styled.h5`
  margin-left:auto;
  margin-right:auto;
  margin-bottom:20px;
  margin-top:20px;
`

const Container = styled(Card)`
  padding:20px;
  margin-top:20px
  margin-bottom:80px;
  .react-pdf__Document {
    display: flex;
    justify-content: center;
  }
  
`
const Content = styled.div`
  padding-left:10px;
  padding-right:10px;
`
const Footer = styled.div`
  margin-top:10px;
`
const ButtonBar = styled.div`
  width:100%;
  text-align: center;
  margin-top:10px;
`

const ButtonNav = styled.button`
  margin:10px;
`
const htmlToReactParser = new HtmlToReact.Parser();

const Material = ({ stage, onFinish}) => {
  const [content,setContent] = useState('');
  const [pageNumber,setPageNumber] = useState(1);
  const [numPages, setNumPages ] = useState(null);
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    setContent(htmlToReactParser.parse(stage.material.body));
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoadComplete(true);
  }

  const next = () => {
    if(pageNumber < numPages){
      setPageNumber(pageNumber + 1);
    }
  }
  const prev = () => {
    if(pageNumber > 1){
      setPageNumber(pageNumber - 1);
    }
  }


  return (
    <Container className="card col-10 offset-1">
      <Title>{stage.title}</Title>
      { stage.material.materialType === "PDF" ?
        <>
          <Document

            file={`https://firebasestorage.googleapis.com/v0/b/kodekurawal-ab777.appspot.com/o/${stage.material.url}?alt=media`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={700} />
          </Document>
          {
            (loadComplete) ?
              <ButtonBar>
                <ButtonNav className="btn btn-primary" onClick={prev}> <FontAwesomeIcon
                  color="white"
                  size="lg"
                  icon="chevron-left"
                /> </ButtonNav>
                <p style={{display:'inline'}}>{pageNumber} / {numPages}</p>
                <ButtonNav className="btn btn-primary" onClick={next}> <FontAwesomeIcon
                  color="white"
                  size="lg"
                  icon="chevron-right"
                /> </ButtonNav>
              </ButtonBar> : <></>
          }

        </>
         :
        <Content>{content}</Content>
      }
      <Footer>
        <button style={{float:'right'}  }className="btn btn-primary" onClick={() => {
          onFinish();
        }}>Selesai</button>
      </Footer>
    </Container>
  )
}
export default Material
