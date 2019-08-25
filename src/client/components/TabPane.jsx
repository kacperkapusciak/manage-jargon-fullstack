import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #dedede;
  margin-bottom: 10px;
`;
const TabLabel = styled.div`
  padding: 8px 10px;
  border: ${({ active }) => (active ? '1px solid #dedede' : 'unset')};
  border-bottom: ${({ active }) => (active ? '#fff' : 'unset')};
  border-radius: 5px;
  min-width: 60px;
  text-align: center;
`;

export const Tab = styled.div``;

const TabPane = ({ defaultTab = 0, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const initialTabState = children.map(child => ({
    title: child.props.title,
    body: child.props.children
  }));

  return (
    <>
      <Wrapper>
        {initialTabState.map((tab, index) => (
          <TabLabel
            key={tab.title}
            active={index === activeTab}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </TabLabel>
        ))}
      </Wrapper>
      {initialTabState[activeTab].body}
    </>
  );
};

export default TabPane;
