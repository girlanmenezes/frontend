import React from 'react';
import HomeTable from "./HomeTable";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="home-page">
      <h1>Dashboard de Tarefas</h1>
      <HomeTable />
    </div>
  );
};

export default HomePage;


