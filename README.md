# package-name

This hook takes care of the whole pagination related logic and returns an array of strings (for dots) and numbers (for pages) which you can use to build fully customizable components.

## Install

```
npm install package-name
```

## Usage

```jsx
import { useState } from "react";
import usePagination from "package-name";

export default function App() {
  const [page, setPage] = useState(1);

  const pagination = usePagination({
    currentPage: page,
    totalPages: 10,
    siblingsCount: 1, // optional, by default set to 1
  });

  return (
    <ul>
      {pagination.map((strOrNum, index) => (
        <li key={index}>
          {typeof strOrNum === "string" ? (
            <span>{strOrNum}</span>
          ) : (
            <button
              style={{ fontWeight: page === strOrNum ? "bold" : "normal" }}
              onClick={() => {
                setPage(strOrNum);
              }}
            >
              {strOrNum}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
```
