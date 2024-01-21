$(function () {

  function scrollToCurrentPage() {
    $(".docs-nav-active")[0].scrollIntoView({
        block: "center",
      });
  }

  scrollToCurrentPage();
});
