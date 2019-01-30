# mxgraph-vsdx
This module converts VSDX files to mxgraph canvas

### Installation
```
npm install -s ksholla20/mxgraph-vsdx
```

### Usage
```
import doImportVisio from "mxgraph-vsdx";

function vsdxImportDone(xml){
  console.log(xml);
}

function vsdxImportDone(){
  console.log("Error");
}

doImportVisio(filename, graph, vsdxImportDone, vsdxImportError);
```

#### Note:
VSDX shapes are created as stencils. Hence, when you export the canvas to xml and import it back, these stencils are not recorded.
Hence following piece of code is required in import XML part
```
function populateStencils(node){
  if (node.localName == 'mxCell') {
    if (node.attributes['style']) {
      const shapeStyles = node.attributes['style'].value.split(';').filter((s) => s.startsWith('shape'));
      if (shapeStyles.length && shapeStyles[0].substring(0, 14) == 'shape=stencil(') {
        const str = shapeStyles[0].substring(14, shapeStyles[0].length - 1);
        mxStencilRegistry.addStencil(str, new mxStencil(mxUtils.parseXml(str).documentElement));
      }
    }
  }
  for(let i = 0; i < node.childElementCount;i++)
    populateStencils(node.children[i]);
}
```
Before decode call, The above function should be called
```
populateStencils(node);
```
