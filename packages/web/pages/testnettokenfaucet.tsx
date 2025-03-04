import { useState, useEffect } from "react";

const FAUCET_AMOUNT = 100; // Amount of test tokens given per request

const TestnetTokenFaucet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false); // To disable button while processing
  const [message, setMessage] = useState(""); // Success/Error messages

  // Load balance from local storage on mount (to persist across refreshes)
  useEffect(() => {
    const storedBalance = localStorage.getItem("testnetTokenBalance");
    if (storedBalance) {
      setBalance(parseInt(storedBalance, 10));
    }
  }, []);

  // Handle token request
  const handleRequestTokens = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const newBalance = balance + FAUCET_AMOUNT;
        setBalance(newBalance);
        localStorage.setItem("testnetTokenBalance", newBalance.toString());
        setMessage(`✅ You received ${FAUCET_AMOUNT} testnet tokens!`);
      } catch (error) {
        console.error("Error updating balance:", error);
        setMessage("❌ Failed to request tokens.");
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  };

  return (
    <div style={{ textAlign: "end", padding: "1px", fontSize:"1px" }}>
      <h2 style={{ fontSize: "15px" }}>Your Testnet Tokens: {balance}</h2>
      <button
        onClick={handleRequestTokens}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "15px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "black",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Requesting..." : "Get Testnet Tokens"}
      </button>
      {message && <p style={{ marginTop: "10px", fontSize: "10px" }}>{message}</p>}
    </div>
  );
};

export default TestnetTokenFaucet;
