import React from "react";

export default function HeaderFormatter(
  column,
  colIndex,
  { sortElement, filterElement }
) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filterElement}
      <span>
        {column.text}
        {sortElement}
      </span>
    </div>
  );
}
