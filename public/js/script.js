function init(){
    fetch("/api/students")
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            for(let i = 0; i < resJSON.length; i++) {
                $("#studentsList").append(`<li>
                                                ${resJSON[i].name}
                                            </li>`);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

init();