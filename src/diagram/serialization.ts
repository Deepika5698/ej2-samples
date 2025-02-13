import { loadCultureFiles } from '../common/culture-loader';
/**
 * Serialization sample
 */

import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, Node,
    SymbolPalette, SymbolInfo, DiagramContextMenu, GridlinesModel, IDragEnterEventArgs, PaletteModel
} from '@syncfusion/ej2-diagrams';
import { Uploader } from '@syncfusion/ej2-inputs';
Diagram.Inject(UndoRedo, DiagramContextMenu);
import { Toolbar, ClickEventArgs, ItemModel } from '@syncfusion/ej2-navigations';
import { openPalette } from './script/diagram-common';

let diagram: Diagram;

//Initializes the nodes for the diagram
let nodes: NodeModel[] = [
    {
        id: 'Start', height: 50, width: 100, offsetX: 250, offsetY: 60,
        shape: { type: 'Flow', shape: 'Terminator' },
        annotations: [{ content: 'Start' }],
        style: { fill: '#d0f0f1', strokeColor: '#797979' }
    },
    {
        id: 'Alarm', height: 50, width: 100, offsetX: 250, offsetY: 160,
        shape: { type: 'Flow', shape: 'Process' },
        annotations: [{
            content: 'Alarm Rings'
        }], style: { fill: '#fbfdc5', strokeColor: '#797979' }
    }, {
        id: 'Ready', height: 80, width: 100, offsetX: 250, offsetY: 260,
        shape: { type: 'Flow', shape: 'Decision' },
        annotations: [{
            content: 'Ready to Get Up?',
        }], style: { fill: '#c5efaf', strokeColor: '#797979' }
    }, {
        id: 'Climb', height: 50, width: 100, offsetX: 250, offsetY: 370,
        shape: { type: 'Flow', shape: 'Process' },
        annotations: [{
            content: 'Climb Out of Bed'
        }], style: { fill: '#fbfdc5', strokeColor: '#797979' }
    }, {
        id: 'End', height: 50, width: 100, offsetX: 250, offsetY: 460,
        shape: { type: 'Flow', shape: 'Terminator' },
        annotations: [{
            content: 'End'
        }], style: { fill: '#d0f0f1', strokeColor: '#797979' }
    }, {
        id: 'Relay', height: 50, width: 100, offsetX: 450, offsetY: 160,
        shape: { type: 'Flow', shape: 'Delay' },
        annotations: [{
            content: 'Relay'
        }], style: { fill: '#f8eee5', strokeColor: '#797979' }
    }, {
        id: 'Hit', height: 50, width: 100, offsetX: 450, offsetY: 260,
        shape: { type: 'Flow', shape: 'Process' },
        annotations: [{
            content: 'Hit Snooze Button',
        }], style: { fill: '#fbfdc5', strokeColor: '#797979' }
    }
];
//Initializes the connector for the diagram
let connectors: ConnectorModel[] = [
    {
        id: 'connector1', sourceID: 'Start', targetID: 'Alarm'
    },
    { id: 'connector2', sourceID: 'Alarm', targetID: 'Ready' },
    {
        id: 'connector3', sourceID: 'Ready', targetID: 'Climb',
        annotations: [{ content: 'Yes', style: { fill: 'white' } }]
    },
    { id: 'connector4', sourceID: 'Climb', targetID: 'End', },
    {
        id: 'connector5', sourceID: 'Ready', targetID: 'Hit',
        annotations: [{ content: 'No', style: { fill: 'white' } }]
    },
    { id: 'connector6', sourceID: 'Hit', targetID: 'Relay' },
    { id: 'connector7', sourceID: 'Relay', targetID: 'Alarm' }
];
let interval: number[];
interval = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };


//Initialize the flowshapes for the symbol palatte
let flowshapes: NodeModel[] = [
    { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
    { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
    { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
    { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
    { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
    { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
    { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
    { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
    { id: 'OffPageReference', shape: { type: 'Flow', shape: 'OffPageReference' } },
    { id: 'SequentialAccessStorage', shape: { type: 'Flow', shape: 'SequentialAccessStorage' } },
    { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' } },
    { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' } },
    { id: 'data', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
    { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' } },
];
//Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
        id: 'link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
        id: 'link4', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'link5', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
];

let palettes: PaletteModel[] = [
    { id: 'flow', expanded: true, symbols: flowshapes, iconCss: 'e-ddb-icons1 e-flow', title: 'Flow Shapes' },
    { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons1 e-connector', title: 'Connectors' }
];

let items: ItemModel[] = [
    {
        id: 'palette-icon',
        prefixIcon: 'e-ddb-icons2 e-toggle-palette',
        align: 'Right',
    },
    { text: 'New', tooltipText: 'New', prefixIcon: 'e-ddb-icons e-new' },
    {
        type: 'Separator'
    },
    {
        text: 'Save', tooltipText: 'Save', prefixIcon: 'e-diagram-icons e-diagram-save'
    },
    {
        type: 'Separator'
    },
    {
        text: 'Load', tooltipText: 'Load', prefixIcon: 'e-ddb-icons e-open'
    },
];


function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    obj.targetDecorator.height = 5;
    obj.targetDecorator.width = 5;
    obj.style.strokeColor = '#797979';
    obj.targetDecorator.style = { fill: '#797979', strokeColor: '#797979' };
    return obj;
}
//Sets the Node style for DragEnter element.
function dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
        let ratio: number = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
    }
}

function toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'New') {
        diagram.clear();
    } else if (args.item.text === 'Load') {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    } else if (args.item.id === 'palette-icon') {
        openPalette();
    } else {
        download(diagram.saveDiagram());
    }
}

//save the diagram object in json data.
function download(data: string): void {
    if (window.navigator.msSaveBlob) {
        let blob: any = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    } else {
        let dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        let a: HTMLAnchorElement = document.createElement('a');
        a.href = dataStr;
        a.download = 'Diagram.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}

//set default value for Node.
function getSymbolDefaults(symbol: NodeModel): void {
    if (symbol.id === 'Terminator' || symbol.id === 'Process' || symbol.id === 'Delay') {
        symbol.width = 80;
        symbol.height = 40;
    } else if (symbol.id === 'Decision' || symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
        symbol.id === 'PaperTap' || symbol.id === 'DirectData' || symbol.id === 'MultiDocument' || symbol.id === 'Data') {
        symbol.width = 50;
        symbol.height = 40;
    } else {
        symbol.width = 50;
        symbol.height = 50;
    }
    symbol.style.strokeWidth = 2;
    symbol.style.strokeColor = '#757575';
}
function getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    //Initializes diagram control
    diagram = new Diagram({
        width: '100%', height: '700px',
        nodes: nodes,
        connectors: connectors,
        snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines },
        //set default value for Connectors.
        getConnectorDefaults: getConnectorDefaults,
        //Sets the Node style for DragEnter element.
        dragEnter: dragEnter

    });
    diagram.appendTo('#diagram');

    //Initializes ToolBar control to invoke save and load the diagram
    let toolbarObj: Toolbar = new Toolbar({
        clicked: toolbarClick,
        items: items
    });
    toolbarObj.appendTo('#toolbar');
    //Initializes the symbol palette
    let palette: SymbolPalette = new SymbolPalette({
        expandMode: 'Multiple',
        palettes: palettes,
        //set default value for Node.
        getNodeDefaults: getSymbolDefaults,
        symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
        getSymbolInfo: getSymbolInfo,
        width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60
    });
    palette.appendTo('#symbolpalette');

    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },
        success: onUploadSuccess,
        showFileList: false
    });
    uploadObj.appendTo('#fileupload');

    function onUploadSuccess(args: { [key: string]: Object }): void {
        let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
        let file: Blob = file1.rawFile as Blob;
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = loadDiagram;
    }
    //Load the diagraming object.
    function loadDiagram(event: ProgressEvent): void {
        diagram.loadDiagram((event.target as FileReader).result.toString());
    }
};
