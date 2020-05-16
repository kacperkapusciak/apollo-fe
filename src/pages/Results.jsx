import React from 'react';
import Card from "../components/QuestionCard";
import {Bar} from "react-chartjs-2";
import styled from "styled-components";
import theme from "../styles/theme";

const TextHeader = styled.p`
  font-size: 18px;
`;
const TextAnswer = styled.p`
  font-size: 14px;
  margin-bottom: 24px;
`;
const TextFooter = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: 24px;
`;

function Results(props) {
  const { results } = props

  return (
    <>
    {results.map((result, rIndex) => ( (result.type !== "text") ? (
          <Card key={rIndex}>
            <TextHeader>{result.title}</TextHeader>
            <TextFooter>{result.total} odpowiedzi</TextFooter>
            <Bar
              data={{
                  labels: result.labels,
                  datasets: [
                    {
                      backgroundColor: theme.colors.primary[400],
                      data: result.data
                    }
                  ]
              }}
              options={{
                title:{
                  display:true,
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
          <TextFooter>{result.total} odpowiedzi</TextFooter>
          {result.data.map((answer, aIndex) =>
            <TextAnswer>{answer}</TextAnswer>
          )}
        </Card>))
      )}
      </>
  );
}

export default Results;
