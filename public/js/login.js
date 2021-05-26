const formEl = document.querySelector('.mainform');
const googlEl = document.querySelector('.googleform');
const answEl = document.querySelector('.answ');

//------- local-------
formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let params = new FormData(formEl);
  answEl.innerHTML = '';
  axios.post('/auth/local', params)
    
    .then(r => {
        let resp = r.data;
        if(resp.isValid) {
          this.window.location.href = '/auth/hello';
        } else {
          answEl.innerHTML = resp.message;
        }
    });
});

//-------google--------
googlEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  window.location.href = "./auth/google";
});
