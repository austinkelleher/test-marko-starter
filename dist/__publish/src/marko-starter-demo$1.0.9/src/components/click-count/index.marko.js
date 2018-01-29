$_mod.def("/marko-starter-demo$1.0.9/src/components/click-count/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.4.28/src/vdom'/*"marko/src/vdom"*/).t(),
    components_helpers = require('/marko$4.4.28/src/components/helpers-browser'/*"marko/src/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/marko-starter-demo$1.0.9/src/components/click-count/index.marko", function() {
      return module.exports;
    }),
    marko_component = require('/marko-starter-demo$1.0.9/src/components/click-count/component'/*"./component"*/),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.e("DIV", {
      id: __component.id
    }, 0, 4);
}

marko_template._ = marko_renderer(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});