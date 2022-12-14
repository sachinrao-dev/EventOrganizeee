import appheader from "./appheader.js";
import apiUrls from "./apiUrls.js";

const eventDetail = {
  getHtml: function () {
    const eventDetailContainer = document.createElement("div");
    eventDetailContainer.id = "eventdetailcontainer";
    eventDetailContainer.appendChild(appheader.getHtml());

    eventDetailContainer.innerHTML = "";
    const eventDetailtag = document.createElement("p");
    const eventDetailTagName = document.createTextNode("Event Details");
    eventDetailtag.appendChild(eventDetailTagName);
    eventDetailContainer.appendChild(eventDetailtag);

    const eventNameContainer = document.createElement("div");
    eventNameContainer.id = "commonInput";
    const eventNamet = document.createElement("p");
    const eventNameTName = document.createTextNode("Event name");
    eventNamet.appendChild(eventNameTName);
    eventNameContainer.appendChild(eventNamet);

    const eventDescriptionTag = document.createElement("p");
    const eventDescriptionTagName = document.createTextNode(
      "this is description of  event "
    );
    eventDescriptionTag.appendChild(eventDescriptionTagName);
    eventNameContainer.appendChild(eventDescriptionTag);
    eventDetailContainer.appendChild(eventNameContainer);

    const eventDescriptionContainer = document.createElement("div");
    eventDescriptionContainer.id = "commonInput";
    const eventDecriptaiontagn = document.createElement("p");
    const eventDecriptaiontagname = document.createTextNode("Event Detail");
    eventDecriptaiontagn.appendChild(eventDecriptaiontagname);
    eventDescriptionContainer.appendChild(eventDecriptaiontagn);
    eventDetailContainer.appendChild(eventDescriptionContainer);

    const eventDrciptationresulttg = document.createElement("p");
    const eventDrciptationresulttgname =
      document.createTextNode("decripatation");
    eventDrciptationresulttg.appendChild(eventDrciptationresulttgname);
    eventDescriptionContainer.appendChild(eventDrciptationresulttg);

    const startAndresultContainer = document.createElement("p");
    startAndresultContainer.id = "commonInput";

    const startDateTag = document.createElement("p");
    const starDateTagName = document.createTextNode("start date");
    startDateTag.appendChild(starDateTagName);
    startAndresultContainer.appendChild(startDateTag);

    const startDateTagResult = document.createElement("p");
    const starDateResultTagName = document.createTextNode("start result date");
    startDateTagResult.appendChild(starDateResultTagName);
    startAndresultContainer.appendChild(startDateTagResult);
    eventDetailContainer.appendChild(startAndresultContainer);

    const endAndresultContainer = document.createElement("p");
    endAndresultContainer.id = "commonInput";

    const endDateTag = document.createElement("p");
    const endDateTagName = document.createTextNode("End date");
    endDateTag.appendChild(endDateTagName);
    endAndresultContainer.appendChild(endDateTag);

    const endDateTagResult = document.createElement("p");
    const endDateResultTagName = document.createTextNode("end result date");
    endDateTagResult.appendChild(endDateResultTagName);
    endAndresultContainer.appendChild(endDateTagResult);
    eventDetailContainer.appendChild(endAndresultContainer);

    const capacityDetailContainer = document.createElement("div");
    capacityDetailContainer.id = "commonInput";

    const capacityDetailtag = document.createElement("p");
    const capacityDetailtagName = document.createTextNode("Capacity");
    capacityDetailtag.appendChild(capacityDetailtagName);
    capacityDetailContainer.appendChild(capacityDetailtag);

    const capacityDetailResulttag = document.createElement("p");
    const capacityDetailResulttagName = document.createTextNode("Capacity");
    capacityDetailResulttag.appendChild(capacityDetailResulttagName);
    capacityDetailContainer.appendChild(capacityDetailResulttag);
    eventDetailContainer.appendChild(capacityDetailContainer);
    const updateAndDeleteContainer = document.createElement("div");

    const updatebtn = document.createElement("button");
    const updatebtnName = document.createTextNode("Update");
    updatebtn.appendChild(updatebtnName);
    updateAndDeleteContainer.appendChild(updatebtn);
    eventDetailContainer.appendChild(updateAndDeleteContainer);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const perticularEventid = urlParams.get("perticularEventid");
    const token = localStorage.getItem("token");

    fetch(apiUrls.eventDetailUrl, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        eventDescriptionTag.innerHTML = `${data?.name?.text}`;
        eventDrciptationresulttg.innerHTML = `${data?.description?.text}`;
        startDateTagResult.innerHTML = `${data?.start?.local}`;
        endDateTagResult.innerHTML = `${data?.end?.local}`;
        capacityDetailResulttag.innerHTML = `${data?.capacity}`;
      });

    const updateEventrute = () => {
      window.location.href = `/updateEvent?perticularEventid=${perticularEventid}`;
    };

    updatebtn.onclick = updateEventrute;
    return eventDetailContainer;
  }
};
export default eventDetail;
