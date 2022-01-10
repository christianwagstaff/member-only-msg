function redirectToNewPostPage() {
  location.href = "/submit";
}
(function redirectToNewPageOnClick() {
  const newPost = document.getElementById("new-post");
  console.log(newPost);
  newPost.addEventListener("click", redirectToNewPostPage);
})();
