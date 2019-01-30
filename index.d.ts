declare module "mxgraph-vsdx" {
  function doImportVisio(file: string, graph: any, done?: any, onerror?: any): void;
  export = doImportVisio;
}
