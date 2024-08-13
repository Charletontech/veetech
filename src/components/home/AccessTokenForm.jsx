import React, { useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import "./Home.css";
import Swal from "sweetalert2";
import FetchRequestOptions from "../FetchRequestOptions";
import { PaystackButton } from "react-paystack";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 380px;
  margin: auto;
  margin-bottom: 1rem;
  background-color: white;
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

// style form
const Form = styled.form`
  max-width: 380px;
  width: 100%;
  padding: 6px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  background: white;
  margin: auto;
`;
const Input = styled.input`
  width: 100%;
  background-color: white;
  padding: 12px 18px;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 1px solid #ddd;
`;

const AccessTokenForm = () => {
  // main code area

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [exam, setExam] = useState("");
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
    setAmount(0);
  };

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Get token",
    onSuccess: ({ reference }) => {
      customAlert(
        "Payment successful!",
        `Transaction reference: ${reference}. <br> Please wait while we generate your access token. This might take a little while. Please do not leave this page...`,
        "info"
      );
      const generateTokenUrl = process.env.REACT_APP_GENERATE_TOKEN_URL;
      fetch(
        generateTokenUrl,
        FetchRequestOptions("POST", { exam: exam, numberOfTokens: 1 })
      )
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errorData) => {
              const troubleCode = errorData.troubleCode;
              customAlert(
                "Oops!",
                `An error occurred while we were generating your access token. But not to worry, your payment was received. Send this trouble code ${troubleCode} to us before the end of today (our contact is on the home page). An Admin will send the access token to you directly.`,
                "error"
              );
              throw new Error(
                "An error occured (status: 500). This might be due to error querying database. Trouble code: ",
                troubleCode
              );
            });
          }
          return res.json();
        })
        .then((data) => {
          customAlert(
            "Access token generated",
            `You have successfully generated an access token. <br> Your ACCESS TOKEN: <b>${data[0]}<b/>. <br> Note: Please save this token somewhere as you may not be able to access it once this page is closed. Thank you.`,
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
        });

      resetForm();
    },
    onClose: () =>
      customAlert("Awwn...", "Wait! We hate to see you go!!!!", "info"),
  };

  // Sweetalert Custom alert
  function customAlert(title, message, icon) {
    Swal.fire({
      title: title,
      html: message,
      icon: icon,
      confirmButtonText: "ok",
      confirmButtonColor: "#69ce7d",
    });
  }

  const getToken = (e, examIndex) => {
    setShowForm(true);
    if (examIndex === 1) {
      setExam("JAMB");
      setAmount(200);
    } else if (examIndex === 2) {
      setExam("WAEC");
      setAmount(100);
    }
  };

  return (
    <div className="frame" style={{ background: "var(--bg)" }}>
      <Navbar />
      <Container>
        <div>
          <Heading>Quick steps</Heading>
          <Message>
            1. Select exam token of choice,
            <br />
            2. Complete form that will be displayed, click "Get token"
            <br />
            3. You will be taken to payment page to make payment
            <br />
            4. Your access token will be displayed on screen.
            <br />
          </Message>
          <div style={{ display: "flex", gap: "15px" }}>
            <SubmitButton onClick={(e) => getToken(e, 1)}>
              JAMB Token
            </SubmitButton>
            <SubmitButton onClick={(e) => getToken(e, 2)}>
              WAEC Token
            </SubmitButton>
          </div>
        </div>
        <Form
          style={showForm ? { display: "flex" } : { display: "none" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Heading style={{ marginTop: "1.5rem", marginBottom: "-0.2rem" }}>
            Purchase form
          </Heading>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Input>
          <Input placeholder={`Exam: ${exam}`} readOnly></Input>

          <PaystackButton className="paystackButtonStyle" {...componentProps} />
        </Form>
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
