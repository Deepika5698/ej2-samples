import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields } from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields);

(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    viewer.appendTo('#pdfViewer');
    viewer.load('HandwrittenSignature.pdf', null);
    // tslint:disable-next-line
    viewer.documentLoad = function(): any {
    viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
    };
};