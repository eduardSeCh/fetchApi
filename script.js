const takeData = () => {
  const storeData = JSON.parse(localStorage.getItem("data"));
  if (storeData) {
    console.log('si esta')
    console.log(storeData.data)
    useData(storeData.data);
  }
  else {
    console.log('no esta')
    fetch("https://reqres.in/api/users?delay=3")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Almacenar los datos localmente
        const expiracion = Date.now() + 60 * 1000; //expiracion 1 min
        console.log(Date.now() + 60 * 1000);
        localStorage.setItem("data", JSON.stringify({ data, expiracion }));
        //mostrar datos
        useData(data);
        //Tomar datos localmente
        /* if (storeData && storeData.expiracion > Date.now()) {
          const { data } = storeData;
        } else {
          takeData();
        } */
      })
      .catch((error) => console.error(error));
  }
};

const useData = (data) => {
  for (let i = 0; i < data.data.length; i++) {
    console.log(data.data[i]);
    document.getElementById("data-body").innerHTML += `
    <tr class="row text-center align-items-center fs-3">
        <td class="col my-4">${data.data[i].first_name}</td>
        <td class="col my-4">${data.data[i].last_name}</td>
        <td class="col my-4">${data.data[i].email}</td>
        <td class="col my-4"><img class="rounded-circle" src="${data.data[i].avatar}" alt=""></td>
    </tr>`;
  }
};
takeData();
