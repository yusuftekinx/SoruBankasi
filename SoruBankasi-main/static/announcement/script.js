/*
  News Ticker - Prashant Shrestha
  Date: 2018-03-03
*/

var hoveredAnnouncement = null;

function announcementTicker() {
  $(".announcements")
    .filter(function(item) {
      return !$(this).is(hoveredAnnouncement);
    })
    .each(function() {
      $(this)
        .find("li:first")
        .slideUp(function() {
          var announcement = $(this).closest(".announcements");
          $(this)
            .appendTo(announcement)
            .slideDown();
        });
    });
}
setInterval(announcementTicker, 5000);

$(function() {  
  $(".announcements").hover(
    function() {
      hoveredAnnouncement = $(this);
    },
    function() {
      hoveredAnnouncement = null;
    }
  );
});