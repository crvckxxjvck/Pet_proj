const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');
const answEl2 = document.querySelector('.answ2');

const arrInputs = document.querySelectorAll('input');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';

      axios.post('/profile', params).then((r) => {
        console.log('>>>>', r.data);
        if (!Array.isArray(r.data)) {
          let success = "Profile was updated successfully"
          answEl.innerHTML = success;
        } else {
          let wrongFieldsArr = r.data.map((el) => el.dataPath.slice(1));
          let wrongFields = [...new Set(wrongFieldsArr)];
          arrInputs.forEach((el) => {
            if(wrongFields.includes(el.name))  {
              el.classList.add("not_valid");
            } 
          });

          if (wrongFields.includes("password")) {
            answEl2.innerHTML = "Passwords should match!";
            arrInputs[3].classList.add("not_valid");
          }
          
          let fail = "Please fill " + wrongFields + " correctly";
          answEl.innerHTML = fail;
        } 
      });

    



  
 
}); 