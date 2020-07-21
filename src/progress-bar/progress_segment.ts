import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ILoadedEventArgs, ProgressTheme, ProgressAnnotation} from '@syncfusion/ej2-progressbar';
ProgressBar.Inject(ProgressAnnotation);

/**
 * Sample for default bullet chart.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    let linearProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '30',
        width: '70%',
        value: 40,
        segmentCount: 50,
        gapWidth: 5,
        trackThickness: 15,
        progressThickness: 15,
        cornerRadius:'Square',
        animation: {
            enable: true,
            duration: 2000
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
                if(selectedTheme === 'highcontrast') {
                    args.progressBar.trackColor = '#969696';
                }
        }
    });
    linearProgress.appendTo('#linearSegment');

    let circularProgress: ProgressBar = new ProgressBar({
        type: 'Circular',
        height: '200px',
        width: '200px',
        trackThickness: 15,
        progressThickness: 15,
        startAngle: 220,
        endAngle: 140,
        segmentCount: 50,
        gapWidth: 5,
        value: 40,
        animation: {
            enable: true,
            duration: 2000
        },
        annotations: [{
            content: '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>'
        }],
        cornerRadius:'Square',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            switch (selectedTheme) {
                case 'material':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'fabric':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'bootstrap':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'bootstrap4':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                default:
                    args.progressBar.trackColor = '#969696';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                    break;
    
            }
        }
    });
    circularProgress.appendTo('#circularSegment');

   let timer = setInterval(timing,2500)
   function timing() {
    if(circularProgress.value >= circularProgress.maximum) {
        clearInterval(timer)
    } else {
        circularProgress.value += 20
        linearProgress.value += 20
    }
}
};
