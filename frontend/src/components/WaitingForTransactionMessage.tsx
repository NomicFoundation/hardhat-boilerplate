export function WaitingForTransactionMessage(props: { txHash: string }) {
  return (
    <div className="alert alert-info" role="alert">
      Waiting for transaction <strong>{props.txHash}</strong> to be mined
    </div>
  );
}
