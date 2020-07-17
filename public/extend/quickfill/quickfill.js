(function ($) {
    $.fn.quickfill = function (data) {
        var _w = $(this).outerWidth();
        var _h = $(this).outerHeight();
        var curObject = this;
        $(curObject).focus(function () {
            $("curObject").remove();
            var htmladd = "";
            htmladd += '<div style=" height:auto ;max-height: 300px;overflow-y: auto;background: white;display: none;border: 1px solid darkgray;position: absolute">';
            if (data != '' || a != undefined) {
                for (i = 0; i < data.length; i++) {
                    htmladd += '<div class="x-l-1" style="text-indent: 0.5em">' + data[i] + '</div>';
                }
            }
            htmladd += '</div>';
            var htmladdObject = $(htmladd);
            htmladdObject.css({
                left: $(curObject).offset().left,
                top: $(curObject).offset().top + _h
            });
            $(curObject).after(htmladdObject);
            $(htmladdObject).slideDown(300);
            $(".x-l-1").mouseover(function () {
                $(this).css("background-color", "#E9E9E4");
            });
            $(".x-l-1").mouseout(function () {
                $(this).css("background-color", "white");
            });
            var cc = _w - 2;
            $(".x-l-1").css("width", cc + "px");
            $(".x-l-1").css("height", _h + "px");
            htmladdObject.children().click(function () {
                $(curObject).val($(this).text());
                $(htmladdObject).hide();
            });
            $(document).on("click", function (event) {
                event.stopPropagation();
                if ($(event.target).find(htmladdObject).length !== 0) {
                    $(htmladdObject).hide();
                }
            });
        });
    };
})(jQuery);