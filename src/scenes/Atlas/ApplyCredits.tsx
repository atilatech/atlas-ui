import React, { useState } from "react";
import { AtlasService } from "../../services/AtlasService";
import { AxiosError } from "axios";

function ApplyCredits() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const response = await AtlasService.applyCredits(email, code);
      console.log({response});
      const { data } = response;
      setResponse(data.message || "Credits applied successfully!");
    } catch (responseError: any) {
       
        let errorMessage = JSON.stringify(error)
        if (responseError instanceof AxiosError) {
            errorMessage = JSON.stringify(responseError?.response?.data?.error)
        } 
        setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container card shadow my-5 p-5">
        <h1 className="text-center">Apply Credits</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              type="text"
              id="code"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {response && <div className="alert alert-success mt-3">{response}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
  );
}

export default ApplyCredits;
