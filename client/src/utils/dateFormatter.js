import moment from 'moment/moment';

function convertDateToRelativeTime(date) {
    date = moment(date).isValid() ? date : new Date();
    return moment(date).fromNow();
}

export { convertDateToRelativeTime };
