

import React from 'react';
import { useState , CSSProperties} from "react";
import { DotLoader } from 'react-spinners';

export default function LoadingScreen() {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('');
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
    color:'green'
  };
  
  return (
    <>
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}> </button>
      <input value={color} onChange={(input) => setColor(input.target.value)} />

      <DotLoader
       
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    
    </>
  )}