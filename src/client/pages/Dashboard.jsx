import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Container from '../components/Container';
import Input from '../components/Input';
import TabPane, { Tab } from '../components/TabPane';
import Card from '../components/Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Dashboard = () => {
  const [tabbedTerms, setTabbedTerms] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('/api/jargon/tabs');
      setTabbedTerms(result.data);
    }

    fetchData();
  }, []);

  return (
    <main>
      <Container>
        <h1>Manage Jargon</h1>
        <Input placeholder="Add new jargon item..." />
        <h2>All Jargon</h2>
        {tabbedTerms ? (
          <TabPane>
            {Object.keys(tabbedTerms).map(tabName => (
              <Tab key={tabName} title={tabName}>
                <Grid>
                  {tabbedTerms[tabName].map(term => (
                    <Card
                      key={term._id}
                      name={term.name}
                      description={term.description}
                    />
                  ))}
                </Grid>
              </Tab>
            ))}
          </TabPane>
        )
          : <p>Loading...</p>}
      </Container>
    </main>
  );
};

export default Dashboard;
