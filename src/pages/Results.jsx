import React from 'react';
import Card from "../components/QuestionCard";
import {Bar} from "react-chartjs-2";
import styled from "styled-components";

const TextHeader = styled.p`
  font-size: 18px;
`;
const TextAnswer = styled.p`
margin-top: 20px;
`;

function Results(props) {
  const { results } = props
  return (
    <>
    {results.map((result, rIndex) => ( (result.type !== "text") ? (
          <Card key={rIndex}>
            <Bar
              data={result.data}
              options={{
                title:{
                  display:true,
                  text:`${result.title}`,
                  fontSize:20
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                      min: 0
                    }
                  }]
                },
                legend:{
                  display:false
                }
              }}
            />
          </Card>
        ):(<Card key={rIndex}>
          <TextHeader>{result.title}</TextHeader>
          {result.data.answers.map((answer, aIndex) =>
            <TextAnswer>{answer}</TextAnswer>
          )}
        </Card>))
      )}
      </>
  );
}

export default Results;
