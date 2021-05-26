const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

const arrInputs = document.querySelectorAll('input');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';

  axios.post(formEl.action, params).then((r) => {
    console.log('>>>>', r.data);
    if (!Array.isArray(r.data)) {
      answEl.innerHTML = r.data;
      window.location.href = "/auth";
    } else {
      let wrongFieldsArr = r.data.map((el) => el.dataPath.slice(1));
      let wrongFields = [...new Set(wrongFieldsArr)];
      arrInputs.forEach((el) => {
        if(wrongFields.includes(el.name)) {
          el.classList.add("not_valid");
        } 
      });
     
      let data = "Please fill " + wrongFields + " correctly";
      answEl.innerHTML = data;
    } 
  });
 
}); 