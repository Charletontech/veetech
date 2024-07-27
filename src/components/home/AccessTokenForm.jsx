import React from "react";
import Navbar from "./Navbar";
import GetRequestOptions from "../GetRequestOptions";
import styled from "styled-components";
import "./Home.css";
import Swal from "sweetalert2";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 400px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h4`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1em;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
`;

// const InputContainer = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 10px;
// `;

// const Input = styled.input`
//   flex: 1;
//   border: none;
//   outline: none;
//   padding: 10px;
//   font-size: 1em;
// `;

// const PhoneIcon = styled.div`
//   width: 24px;
//   height: 24px;
//   margin-right: 10px;
// `;

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

const AccessTokenForm = () => {
  // Sweetalert Custom alert
  function customAlert(title, message, icon) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: true,
      // timer: 15000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: `${icon}`,
      title: `${title}`,
      text: `${message}`,
    });
  }

  const getToken = () => {
    try {
      fetch("http://localhost:5000/api/get-token", GetRequestOptions("get"))
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) =>
          customAlert(
            "Token Success",
            `You have successfully generated an exam token. Your token is ${data}. This token can only be used once.`,
            "success"
          )
        )
        .catch((err) => {
          customAlert("Oops!", "an error ocurred, try again please.", "error");
          console.log(err);
        });
    } catch (err) {
      customAlert(
        "Oops!",
        "an error ocurred, this could be due to network issues, try again please.",
        "error"
      );
      console.log(err);
    }
  };

  return (
    <div className="frame" style={{ background: "var(--bg)" }}>
      <Navbar />
      <Container>
        <Heading>Quick steps</Heading>
        <Message>
          Click on the "Get Token" button below,
          <br />
          Make payment (Each access token costs N200),
          <br />
          Get redirected to our agent on WhatsApp to get your Token.
          <br />
        </Message>
        <SubmitButton onClick={getToken}>Get Token</SubmitButton>
      </Container>
    </div>
  );
};

// `  <div className="frame" style={{ background: "var(--bg)" }}>
// <Navbar />
// <Container>
//   <Heading>Instruction</Heading>
//   <Message>
//     Make a bank transfer to this account detail:
//     <br />
//     Account Number: 0283901939,
//     <br />
//     Account Name: Veetech Consult,
//     <br />
//     Bank: Hope PSB,
//     <br />
//     Each access token costs N200.
//     <br />
//     After making payment please fill in your phone number and send to us.
//   </Message>
//   <InputContainer>
//     <PhoneIcon>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         height="24px"
//         viewBox="0 -960 960 960"
//         width="24px"
//         fill="#5f6368"
//       >
//         <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
//       </svg>
//     </PhoneIcon>
//     <Input type="tel" placeholder="Phone number" />
//     <SubmitButton>Send</SubmitButton>
//   </InputContainer>
// </Container>
// </div> `

export default AccessTokenForm;
