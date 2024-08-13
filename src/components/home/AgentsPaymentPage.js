import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 380px;
  //   margin: auto;
  //   margin-bottom: 1rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h4`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  background-color: #69ce7d;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #57b268;
  }
`;

const Message = styled.p`
  font-size: 1em;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const AgentsPaymentPage = () => {
  return (
    <div
      className="frame"
      style={{
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <div>
          <Heading>Agent Resellers</Heading>
          <Message>
            Pay for Bulk Access Tokens here and resell.
            <br />
            Click the "Pay now" button below.
          </Message>
          <div style={{ display: "flex", gap: "19px" }}>
            <SubmitButton>
              <a
                href="https://paystack.com/pay/h75pz0a1j2"
                style={{ color: "white" }}
              >
                Pay now
              </a>
            </SubmitButton>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgentsPaymentPage;
