function fetchData() {
  fetch("../../FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
fetchData();
