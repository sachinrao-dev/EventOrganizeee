import apiUrls from "./apiUrls.js";

const updateevent = {
  getHtml: function () {
    const orgID = localStorage.getItem("orgId")

    const updateContainer = document.createElement("div");
    updateContainer.id = "eventdetailcontainer";
    const newEvenUpdatetTag = document.createElement("p");
    const neweventUpdateTxt = document.createTextNode("Update Event");
    newEvenUpdatetTag.appendChild(neweventUpdateTxt);
    updateContainer.appendChild(newEvenUpdatetTag);

    const inputeventUpdateContainer = document.createElement("div");
    inputeventUpdateContainer.id = "commonInput";
    const eventUpdateNametag = document.createElement("p");
    const eventUpdateNameTagName = document.createTextNode("Event name");
    eventUpdateNametag.appendChild(eventUpdateNameTagName);
    inputeventUpdateContainer.appendChild(eventUpdateNametag);

    const eventUpdateTxtInput = document.createElement("input");
    eventUpdateTxtInput.id = "eventInput";
    eventUpdateTxtInput.placeholder = "enter the event name";
    inputeventUpdateContainer.appendChild(eventUpdateTxtInput);
    updateContainer.appendChild(inputeventUpdateContainer);

    const eventUpdateDetailContainer = document.createElement("div");
    updateContainer.appendChild(eventUpdateDetailContainer);
    eventUpdateDetailContainer.id = "commonInput";

    const eventUpdateDetailTag = document.createElement("p");
    const eventUpdateDetailTagName = document.createTextNode("Event Detail");
    eventUpdateDetailTag.appendChild(eventUpdateDetailTagName);
    eventUpdateDetailContainer.appendChild(eventUpdateDetailTag);

    const eventUpdateDetailInput = document.createElement("input");
    eventUpdateDetailInput.id = "eventdetailinput";
    eventUpdateDetailInput.placeholder = "enter event detail";
    eventUpdateDetailContainer.appendChild(eventUpdateDetailInput);

    const startUpdateDateContainer = document.createElement("div");
    startUpdateDateContainer.id = "commonInput";
    updateContainer.appendChild(startUpdateDateContainer);

    const startUpdateDateTag = document.createElement("p");
    const starUpdateDateTagName = document.createTextNode("Start date");
    startUpdateDateTag.appendChild(starUpdateDateTagName);
    startUpdateDateContainer.appendChild(startUpdateDateTag);

    const startUpdateDateinput = document.createElement("input");
    startUpdateDateinput.type = "date";
    startUpdateDateinput.id = "strt";
    startUpdateDateinput.placeholder = "enter date";
    startUpdateDateContainer.appendChild(startUpdateDateinput);

    const endUpdateDateContainer = document.createElement("div");
    endUpdateDateContainer.id = "commonInput";
    updateContainer.appendChild(endUpdateDateContainer);

    const endUpdateDatetag = document.createElement("div");
    const endUpdateDatetagName = document.createTextNode(" End date");
    endUpdateDatetag.appendChild(endUpdateDatetagName);
    endUpdateDateContainer.appendChild(endUpdateDatetag);

    const endUpdateDateinput = document.createElement("input");
    endUpdateDateinput.id = "end";
    endUpdateDateinput.type = "date";
    endUpdateDateinput.placeholder = "Enter end date";
    endUpdateDateContainer.appendChild(endUpdateDateinput);

    const capacityUpdateContainer = document.createElement("div");
    capacityUpdateContainer.id = "commonInput";
    updateContainer.appendChild(capacityUpdateContainer);

    const capacityUpdatetag = document.createElement("p");
    const capacityUpdatetagName = document.createTextNode("Capacity");
    capacityUpdatetag.appendChild(capacityUpdatetagName);
    capacityUpdateContainer.appendChild(capacityUpdatetag);

    const capacityUpdateinput = document.createElement("input");
    capacityUpdateinput.id = "cpcty";
    capacityUpdateinput.placeholder = "capacity";
    capacityUpdateContainer.appendChild(capacityUpdateinput);

    const updatebtn = document.createElement("button");
    const updatebtnName = document.createTextNode("Save Changes");
    updatebtn.appendChild(updatebtnName);
    updateContainer.appendChild(updatebtn);

    const token = localStorage.getItem("token");

    const updateResponse = () => {
      const eventNm = document.getElementById("eventInput").value;
      const eventdeccription =
        document.getElementById("eventdetailinput").value;
      const startdt = document.getElementById("strt").value;
      const isoStartDate = new Date(startdt).toISOString().slice(0, -5) + "Z";
      const enddt = document.getElementById("end").value;
      const enddateiso = new Date(enddt).toISOString().slice(0, -5) + "Z";
      const cpcty = document.getElementById("cpcty").value;

      const body = {
        event: {
          name: {
            html: eventNm
          },
          description: {
            html: eventdeccription
          },
          start: {
            timezone: "UTC",
            utc: isoStartDate
          },
          end: {
            timezone: "UTC",
            utc: enddateiso
          },
          currency: "USD",
          capacity: cpcty
        }
      };

      fetch(apiUrls.eventDetailUrl, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)

      })
        .then((response) => response.json())
        .then((data) => {
      window.location.replace("/dashboard")
        });
    };

    fetch(apiUrls.updateDetailUrl, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.name.text);
        eventUpdateTxtInput.value = data.name.text;
        eventUpdateDetailInput.value = data.description.text;
        startUpdateDateinput.value = data.start.local.split("T")[0];
        endUpdateDateinput.value = data.start.local.split("T")[0];
        capacityUpdateinput.value = data.capacity;
      });

    updatebtn.onclick = updateResponse;

    return updateContainer;
  }
};

export default updateevent;
