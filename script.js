const URL = 'https://jsonplaceholder.typicode.com/posts/';
let display = document.querySelector('.display');
let myForm = document.querySelector('.myForm');
let titleId = document.getElementById('titleId');
let postId = document.getElementById('postId');
let output = '';
var tempVar = 1;
var dataVar = 1;
function checkInput(){
  if(titleId.value==''){
    alert("Title cannot be blank!!!");
    return false;
  }
  if(postId.value==''){
    alert("Content cannot be blank!!!");
    return false;
  }
  return true;
}
function cardDisplay(posts) {
  posts.forEach(post => {
    output += `
            <div class="col-md-6" dataid=${dataVar++}>
                <div class="card mt-5">
                    <div class="card-body">
                        <h5 class="card-title">Id: ${post.id}</h5>
                        <h5 class="card-title">Title:</h5><p>${post.title}</p>
                        <h5>Content:</h5> 
                        <p class="card-text">${post.body}</p>
                        <button href="" class="card-btn comments" id="commentsId">Comments <i class="icon-comments-alt"></i></button>
                        <button href="" class="card-btn delete" id="deleteId">Delete <i class="icon-trash"></i></button>
                    </div>
                </div>
            </div>`;
  });
  display.innerHTML = output;
}

fetch(URL)
  .then(result => result.json())
  .then(data => cardDisplay(data))
  myForm.addEventListener('submit', (preventReload) => {
  preventReload.preventDefault();
  if(checkInput()){
    
  
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title: titleId.value,
        body: postId.value
      })
    })
      .then(result => result.json())
      .then(data => {
        let array = [];
        array.push(data);
        cardDisplay(array);
      })
      titleId.value = ''
      postId.value = ''
  }
  })
  
display.addEventListener('click', (clickId) => {
  clickId.preventDefault();
  if (clickId.target.id == "deleteId") {
    fetch(URL + `${clickId.target.parentNode.parentNode.parentNode.getAttribute("dataid")}`, {
      method: 'DELETE',
    });
    clickId.target.parentNode.parentNode.parentNode.remove();
  }
  if (clickId.target.id == "commentsId") { 
    sessionStorage.setItem("postId", clickId.target.parentNode.parentNode.parentNode.getAttribute("dataid"));
    location.href = "displayComments.html";
  }
})