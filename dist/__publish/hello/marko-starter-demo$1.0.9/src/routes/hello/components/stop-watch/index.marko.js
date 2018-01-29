$_mod.def("/marko-starter-demo$1.0.9/src/routes/hello/components/stop-watch/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.4.28/src/vdom'/*"marko/src/vdom"*/).t(),
    marko_component = ({
    onCreate: function () {
        this.state = {
            running: false,
            elapsedTime: 0
        };
        this.intervalId = null;
    },
    onDestroy: function () {
        if (this.state.running) {
            clearInterval(this.intervalId);
        }
    },
    handleStartClick: function () {
        this.state.running = true;
        this.intervalId = setInterval(() => {
            this.state.elapsedTime += 0.1;
        }, 100);
    },
    handlePauseClick: function () {
        clearInterval(this.intervalId);
        this.state.running = false;
    },
    handleStopClick: function () {
        clearInterval(this.intervalId);
        this.state.running = false;
        this.state.elapsedTime = 0;
    }
}),
    components_helpers = require('/marko$4.4.28/src/components/helpers-browser'/*"marko/src/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/marko-starter-demo$1.0.9/src/routes/hello/components/stop-watch/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.e("DIV", {
      id: __component.id
    }, 4, 4)
    .e("P", null, 3)
      .t("Elapsed time: ")
      .t(state.elapsedTime.toFixed(1))
      .t("s")
    .e("BUTTON", {
        type: "button",
        disabled: state.running === true
      }, 1, 0, {
        onclick: __component.d("handleStartClick")
      })
      .t("Start")
    .e("BUTTON", {
        type: "button",
        disabled: state.running !== true
      }, 1, 0, {
        onclick: __component.d("handlePauseClick")
      })
      .t("Pause")
    .e("BUTTON", {
        type: "button",
        disabled: (state.elapsedTime === 0) && (state.running === false)
      }, 1, 0, {
        onclick: __component.d("handleStopClick")
      })
      .t("Stop/Clear");
}

marko_template._ = marko_renderer(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});