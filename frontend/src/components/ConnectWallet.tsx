import { MouseEventHandler } from "react";
import { NetworkErrorMessage } from "./NetworkErrorMessage";

interface ConnectWalletProps {
  connectWallet: MouseEventHandler<HTMLButtonElement>;
  networkError?: string;
  dismiss: MouseEventHandler<HTMLButtonElement>;
}

export function ConnectWallet({
  connectWallet,
  networkError,
  dismiss,
}: ConnectWalletProps) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
