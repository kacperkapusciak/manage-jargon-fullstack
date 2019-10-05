import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;
const TabLabel = styled.div`
  padding: 8px 10px;
  color: ${({ active }) => (active ? '#fff' : 'rgb(52, 95, 144)')};
  min-width: 60px;
  height: 50px;
  line-height: 33px;
  text-align: center;
  background: ${({ active }) => (active ? 'rgb(52, 95, 144)' : '#fff')};
  transition: all 250ms ease-in;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  user-select: none;

  &:first-child {
    border-left: 1px solid #ccc;
    border-radius: 20px 0 0 20px;
    padding-left: 16px;
  }
  &:last-child {
    border-right: 1px solid #ccc;
    border-radius: 0 20px 20px 0;
    padding-right: 16px;
  }
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
