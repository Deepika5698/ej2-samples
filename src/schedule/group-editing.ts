import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule, ScheduleModel, Day, WorkWeek, Month, TimelineViews, ResourceDetails, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * schedule shared events sample
 */
Schedule.Inject(Day, WorkWeek, Month, TimelineViews, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    // custom code start
    interface TemplateFunction extends Window {
        getEmployeeImage?: Function;
        getEmployeeName?: Function;
        getEmployeeDesignation?: Function;
    }
    // custom code end

    let monthEventTemplate: string = '<div class="subject">${Subject}</div>';
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        currentView: 'WorkWeek',
        selectedDate: new Date(2021, 5, 5),
        resourceHeaderTemplate: '#resourceTemplate',
        views: [
            { option: 'Day' }, { option: 'WorkWeek' },
            { option: 'Month', eventTemplate: monthEventTemplate },
            { option: 'TimelineWeek' }
        ],
        group: {
            allowGroupEdit: true,
            resources: ['Conferences']
        },
        resources: [{
            field: 'ConferenceId', title: 'Attendees',
            name: 'Conferences', allowMultiple: true,
            dataSource: [
                { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
                { Text: 'Robert', Id: 2, Color: '#357cd2' },
                { Text: 'Laura', Id: 3, Color: '#7fa900' }
            ],
            textField: 'Text', idField: 'Id', colorField: 'Color'
        }],
        eventSettings: {
            dataSource: (dataSource as any).resourceConferenceData,
            fields: {
                subject: { title: 'Conference Name', name: 'Subject' },
                description: { title: 'Summary', name: 'Description' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' }
            }
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions);
    scheduleObj.appendTo(document.getElementById('Schedule'));

    // custom code start
    (window as TemplateFunction).getEmployeeName = (value: ResourceDetails) => {
        return ((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] : value.resourceName;
    };

    (window as TemplateFunction).getEmployeeImage = (value: ResourceDetails) => {
        let resourceName: string = (window as TemplateFunction).getEmployeeName(value);
        return resourceName.replace(' ', '-').toLowerCase();
    };

    (window as TemplateFunction).getEmployeeDesignation = (value: ResourceDetails) => {
        let resourceName: string = (window as TemplateFunction).getEmployeeName(value);
        return (resourceName === 'Margaret') ? 'Sales Representative' : (resourceName === 'Robert') ?
            'Vice President, Sales' : 'Inside Sales Coordinator';
    };
    // custom code end
};