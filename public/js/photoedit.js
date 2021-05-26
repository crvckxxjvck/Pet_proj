const formEl = document.querySelector('.mainform');
const statusEl = document.querySelector('.status');
const arrInputs = document.querySelectorAll('input');

formEl.addEventListener('submit', ev => {
    ev.preventDefault();
    const params = new FormData(formEl);
    statusEl.innerHTML = '';
    axios.post('/photoedit', params)
    .then((r) => {
      
      if (!Array.isArray(r.data)) {
        statusEl.innerHTML = r.data;
      } else {
        let wrongFieldsArr = r.data.map((el) => el.dataPath.slice(1));
        let wrongFields = [...new Set(wrongFieldsArr)];
        arrInputs.forEach((el) => {
          if(wrongFields.includes(el.name)) {
            el.classList.add("not_valid");
          } 
        });
        let data = "Please fill " + wrongFields + " correctly";
        statusEl.innerHTML = data;
      } 
    });
});