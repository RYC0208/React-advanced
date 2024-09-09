import React from "react";
import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <div>
      <Link to="/">
        <button>Main 이동</button>
      </Link>
    </div>
  );
};

export default Empty;
