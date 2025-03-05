(function ($, Drupal) {
  Drupal.behaviors.moreInfoToggle = {
    attach: function (context, settings) {
      $(document).ready(function () {
        //triggered dialog to render more info about movie, we use drupal.behaviors to attach this behavior when ajax inside drupal called
        $('.open-dialog-info', context).once('moreInfoToggle').on('click', function () {
          var target = '#more-info' + this.id;
          if ($(target).css('display') === 'none') {
            $(target).css('display', 'block');
            $('#' + this.id).val('Less..');
          } else {
            $(target).css('display', 'none');
            $('#' + this.id).val('Learn More..');
          }
        });
      });
    }
  };
})(jQuery, Drupal);
