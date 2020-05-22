import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styled, { withTheme } from 'styled-components';
import { Bar } from 'react-chartjs-2';

import axios from 'axios-instance';

import Card from 'components/QuestionCard';


const TextHeader = styled.p`
  font-size: 18px;
`;
const TextAnswer = styled.p`
  font-size: 14px;
  margin-bottom: 24px;
`;
const AnswerCount = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: 24px;
`;

function formatResults(data) {
  const results = [...data];

  for (const result of results) {
    if (result.type === 'text') continue

    result.labels = [];
    result.data = [];

    result.answers.forEach(answer => {
      result.labels.push(answer.value);
      result.data.push(answer.count);
    })
  }

  return results
}

function Results(props) {
  const { theme, url } = props;
  const [results, setResults] = useState();

  useEffect(() => {
    async function loadResults() {
      const { data } = await axios.get(`results/${url}`);
      if (data) {
        const formattedResults = formatResults(data);
        setResults(formattedResults);
      }
    }

    loadResults();
  }, []);

  // results live-update every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await axios.get(`results/${url}`);
      if (data) {
        const formattedResults = formatResults(data);
        if (!_.isEqual(formattedResults, results))
          setResults(formattedResults);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!results)
    return null

  return (
    <div>
      {results.map((result, rIndex) => ((result.type !== "text") ? (
          <Card key={rIndex}>
            <TextHeader>{result.title}</TextHeader>
            <AnswerCount>{result.total} odpowiedzi</AnswerCount>
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
                legend: {
                  display: false
                }
              }}
            />
          </Card>
        ) : (
          <Card key={rIndex}>
            <TextHeader>{result.title}</TextHeader>
            <AnswerCount>{result.total} odpowiedzi</AnswerCount>
            {result.answers.map((answer, index) => <TextAnswer key={`${answer}-${index}`}>{answer}</TextAnswer>)}
          </Card>
        ))
      )}
    </div>
  );
}

export default withTheme(Results);
