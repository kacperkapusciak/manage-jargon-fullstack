import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';

import { withAuth } from '../providers/AuthProvider';

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

const Dashboard = ({ auth }) => {
  const [{ data: tabbedTerms, loading, error }, refetch] = useAxios({
    url: '/api/jargon/tabs',
    method: 'GET',
    headers: { 'x-auth-token': auth.token },
  });

  return (
    <main>
      <Container>
        <Input placeholder="Add new jargon item..." />
        <h2>All Jargon</h2>
        {!loading ? (
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

export default withAuth(Dashboard);
