 $(function() {
                $("#tabs").tabs({
                    beforeLoad: function(event, ui) {
                        ui.jqXHR.fail(function() {
                            ui.panel.html(
                                    "Impossible de charger cette page.");
                        });
                    }, hide: {effect: "slide", duration: 500}, heightStyle: 'content'
                });
            });