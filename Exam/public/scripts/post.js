var done = document.querySelectorAll(".done");
done.forEach(function(each, index){
    var check = document.querySelectorAll(".btn-done")[index];
    if(each.innerText === "否"){
        check.disabled = false;
    }
})
