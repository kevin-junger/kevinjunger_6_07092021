function fetchData() {
  fetch("../../FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.photographers);
      document.getElementById('test-nom').innerText = `${data.photographers[0].name}`;
      console.log(data.media);
    });
}
fetchData();
