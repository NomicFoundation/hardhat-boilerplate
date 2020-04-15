import React from "react";

export function NoTokensMessage({ selectedAddress }) {
  return (
    <>
      <p>You don't have tokens to transfer</p>
      <p>
        To get some tokens, run{" "}
        <code>npx buidler --network localhost faucet {selectedAddress}</code>
      </p>
    </>
  );
}
