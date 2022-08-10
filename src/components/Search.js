import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef("");
  return (
    <Container>
      <FormElement
        onSubmit={(e) => {
          e.preventDefault();
          props.getSearchedGame(query);
        }}
      >
        <InputField
          ref={inputRef}
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchB type="submit">Search</SearchB>
      </FormElement>
    </Container>
  );
};

export default SearchBar;

const InputField = styled.input`
  padding: 5px;
  background: transparent;
  color: white;
  width: 70%;
  border: none;
  &: focus {
    outline: 0;
  }
`;
const FormElement = styled.form`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  top: -10px;
  background: #46618b;
  border-radius: 5px;
`;
const SearchB = styled.button`
  padding: 5px;
  background: #394e70;
  border: none;
  cursor: pointer;
  float: right;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
  -ms-transform: translateY(-60%);
  transform: translateY(800%);
`;
