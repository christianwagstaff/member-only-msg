function redirectToNewPostPage() {
  location.href = "/submit";
}
(function redirectToNewPageOnClick() {
  const newPost = document.getElementById("new-post");
  newPost.addEventListener("click", redirectToNewPostPage);
})();
