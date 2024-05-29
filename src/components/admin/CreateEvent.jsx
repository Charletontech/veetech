import Swal from "sweetalert2";

const CreateEvent = () => {
  const createEventForm = new FormData();
  createEventForm.append("eventName", "");
  createEventForm.append("organizer", "");
  createEventForm.append("date", "");
  createEventForm.append("location", "");
  createEventForm.append("eventCode", "");
  createEventForm.append("noOfGuests", "");
  createEventForm.append("starRating", "");
  createEventForm.append("regular", "");
  createEventForm.append("vip", "");
  createEventForm.append("vvip", "");
  createEventForm.append("table", "");
  createEventForm.append("description", "");
  createEventForm.append("flyer", "");

  const handleForm = (e) => {
    switch (e.target.name) {
      case "eventName":
        createEventForm.set("eventName", e.target.value);
        break;
      case "organizer":
        createEventForm.set("organizer", e.target.value);
        break;
      case "date":
        createEventForm.set("date", e.target.value);
        break;
      case "location":
        createEventForm.set("location", e.target.value);
        break;
      case "eventCode":
        createEventForm.set("eventCode", e.target.value);
        break;
      case "noOfGuests":
        createEventForm.set("noOfGuests", e.target.value);
        break;
      case "regular":
        createEventForm.set("regular", e.target.value);
        break;
      case "vip":
        createEventForm.set("vip", e.target.value);
        break;
      case "vvip":
        createEventForm.set("vvip", e.target.value);
        break;
      case "table":
        createEventForm.set("table", e.target.value);
        break;
      case "starRating":
        createEventForm.set("starRating", e.target.value);
        break;
      case "description":
        createEventForm.set("description", e.target.value);
        break;
      case "flyer":
        createEventForm.set("flyer", e.target.files[0]);
        break;

      default:
        break;
    }
  };

  const submitEvent = (e) => {
    e.target.innerHTML = "Creating event, please wait...";
    let isEmptyField = false;
    for (let [key, value] of createEventForm.entries()) {
      console.log(key);
      if (!value) {
        isEmptyField = true;
      }
    }

    if (isEmptyField) {
      e.target.innerHTML = "Create event"
      Swal.fire({
        icon: "warning",
        title: "Fill All Fields!",
        text: "Empty fields were detected in the form. Please ensure you have filled all fields.",
        showCloseButton: true,
        showConfirmButton: false,
      });
      return;
    } else {
      var options = {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer 123`,
        }),
        body: createEventForm,
      };
      fetch("https://osele-tickets-server.onrender.com/create-event", options)
        .then((res) => {
          if (res.ok) {
            e.target.innerHTML = "Create event";
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
              title: "Success!",
              text: "Event successfully created!",
            });
          } else {
            indicateFailed();
            e.target.innerHTML = "Create event";
          }
        })
        .catch((error) => {
          indicateFailed();
          e.target.innerHTML = "Create event";
          console.error("Error:", error);
        });

      function indicateFailed() {
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
          title: "Oops!",
          text: "An error occurred. Event was not created, please try again.",
        });
      }
    }
  };

  return (
    <>
      <div className="admin-content-area" id="create-event">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="create-event-form-input-group">
            <p style={{ color: "var(--pink" }}>Note: fill all fields.</p>
            <div>
              <div>
                <label>Event Name</label>
                <input onChange={handleForm} type="text" name="eventName" />
              </div>
              <div>
                <label>Organizer</label>
                <input onChange={handleForm} type="text" name="organizer" />
              </div>
              <div>
                <label>Date</label>
                <input onChange={handleForm} type="date" name="date" />
              </div>
              <div>
                <label>Location</label>
                <input onChange={handleForm} type="text" name="location" />
              </div>
            </div>

            <div>
              <div>
                <label>Event code</label>
                <input
                  onChange={handleForm}
                  type="text"
                  name="eventCode"
                  maxLength={3}
                />
              </div>
              <div>
                <label>Number of tickets</label>
                <input
                  onChange={handleForm}
                  type="number"
                  name="noOfGuests"
                  min={0}
                />
              </div>
              <div>
                <label>Ticket prices</label>
                <div id="ticketPricesCont">
                  <input
                    onChange={handleForm}
                    type="number"
                    name="regular"
                    placeholder="Regular"
                    min={0}
                  />
                  <input
                    onChange={handleForm}
                    type="number"
                    name="vip"
                    placeholder="VIP"
                    min={0}
                  />
                  <input
                    onChange={handleForm}
                    type="number"
                    name="vvip"
                    placeholder="VVIP"
                    min={0}
                  />
                  <input
                    onChange={handleForm}
                    type="number"
                    name="table"
                    placeholder="Table"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label>Star rating (1-10)</label>
                <input
                  onChange={handleForm}
                  type="number"
                  name="starRating"
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </div>

          <div className="create-event-form-textarea">
            <label>Description of event</label>
            <textarea
              onChange={handleForm}
              name="description"
              cols="30"
              rows="10"
            ></textarea>

            <label>Flyer</label>
            <input type="file" name="flyer"  onChange={handleForm} />
            <button type="submit" onClick={submitEvent}>
              Create Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
