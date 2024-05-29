import Swal from "sweetalert2";
import FetchRequestOptions from "../FetchRequestOptions";

const CustomersList = ({customers}) => { 
  function debitUser(account, phone) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "info",
      title: "Hold on",
      text: "Processing request...",
    });
    fetch('https://osele-tickets-server.onrender.com/debit-user', FetchRequestOptions('POST', {account: account, phone: phone}))
    .then(res => {
      if (res.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "User debited!",
          text: "Admin has been credited successfully.",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Failed!",
          text: "An error occurred. We could not debit this user. The user may have insufficient funds.",
        });
      }
    })
  }
  return (
    <>
      <div className="admin-content-area" id='all-customers-cont'>
        <table>
            <thead>
              <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Wallet</th>
                  <th>Balance</th>
                  <th>Email</th>
                  <th>D.O.B</th>
                  <th>Gender</th>
                  <th>Date registered</th>
                  <th>Action</th>
              </tr>
            </thead>
            
           <tbody>
            { customers? 
              customers.map(each => {
                return <tr key={each.id}>
                  <td> {each.id} </td>
                  <td>{each.fullName}</td>
                  <td>{each.phone}</td>
                  <td>{each.account}</td>
                  <td>{each.balance}</td>
                  <td>{each.email}</td>
                  <td>{each.dob}</td>
                  <td>{each.gender}</td>
                  <td>{each.regDate}</td>
                  <td onClick={() => debitUser(each.account, each.phone)}><button>Debit</button></td>
               </tr>
              }) : <p>Fetching all customers data...</p>
            }
           
           </tbody>
        </table>
      </div>
    </>
  )
}

export default CustomersList
