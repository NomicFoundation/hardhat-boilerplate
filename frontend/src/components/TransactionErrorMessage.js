import React from "react";

export function TransactionErrorMessage({ message, dismiss }) {
  return (
    <div className="alert alert-danger text-center mt-3" role="alert">
      Error sending transaction: {message.substring(0, 150)}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
