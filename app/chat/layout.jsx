import React from "react";
import { MongoMemoryServer } from 'mongodb-memory-server';
const layout = ({ children }) => {
  return <div className=" h-full">{children}</div>;
};

export default layout;
