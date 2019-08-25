import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from '../components/Container';
import Input from '../components/Input';
import TabPane, { Tab } from '../components/TabPane';

const Dashboard = () => {
  const [tabbedTerms, setTabbedTerms] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('/api/jargon/tabs');
      setTabbedTerms(result.data);
    }

    fetchData();
  }, []);

  console.log(tabbedTerms);

  return (
    <main>
      <Container>
        <h1>Manage Jargon</h1>
        <Input placeholder="Add new jargon item..." />
        <h2>All Jargon</h2>
        {tabbedTerms ? (
          <TabPane>
            {Object.keys(tabbedTerms).map((tabName) => {
              return (
                <Tab key={tabName} title={tabName}>
                  {tabbedTerms[tabName].map(({ _id, name, description }) => (
                    <div key={_id}>
                      <h4>{name}</h4>
                      <p>{description}</p>
                    </div>
                  ))}
                </Tab>
              );
            })}
          </TabPane>
        )
          : <p>Loading...</p>}
      </Container>
    </main>
  );
};

export default Dashboard;
