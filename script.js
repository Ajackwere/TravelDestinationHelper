document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "./db.json";

  // Function to fetch data from the JSON file
  async function fetchData() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data:", error);
      return null;
    }
  }

  // Function to update destination information with data
  async function updateDestinationInfo(destinationElement, city) {
    const destinationInfo = destinationElement.querySelector(".destination-info");
    const populationElement = destinationInfo.querySelector(".population");
    const weatherElement = destinationInfo.querySelector(".weather-forecast");
    const temperatureElement = destinationInfo.querySelector(".temperature");

    const data = await fetchData();
    if (data) {
      const cityData = data.cities.find((item) => item.name === city);
      if (cityData) {
        populationElement.textContent = cityData.population;
        weatherElement.textContent = cityData["weather-forecast"];
        temperatureElement.textContent = cityData.Temperature;
      }
    } else {
      populationElement.textContent = "N/A";
      weatherElement.textContent = "N/A";
      temperatureElement.textContent = "N/A";
    }
  }

  // Function to add a comment to the comments section
  function addComment(comment, commentsElement) {
    const newComment = document.createElement("p");
    newComment.textContent = comment;
    commentsElement.appendChild(newComment);
  }

  // Function to handle the like button click
  function handleLikeButtonClick(likeButton, likeCountElement) {
    let likeCount = parseInt(likeCountElement.textContent);
    likeCount++;
    likeCountElement.textContent = likeCount;
  }

  // Get all destination list items
  const destinations = document.querySelectorAll(".destination");

  // Loop through each destination
  destinations.forEach((destination) => {
    const commentBox = destination.querySelector(".comment-box");
    const commentsElement = destination.querySelector(".comments");
    const likeButton = destination.querySelector(".like-button");
    const likeCountElement = destination.querySelector(".likes");

    // Event listener for submitting a comment
    commentBox.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && commentBox.value.trim() !== "") {
        const comment = commentBox.value.trim();
        addComment(comment, commentsElement);
        commentBox.value = "";
      }
    });

    // Event listener for the like button
    likeButton.addEventListener("click", function () {
      handleLikeButtonClick(likeButton, likeCountElement);
    });

    // Extract the city name from the destination title
    const cityName = destination.querySelector("h2").textContent;

    // Update destination information with data
    updateDestinationInfo(destination, cityName);
  });
});
