import axios from 'axios';
import Router from 'next/router';

import WithForm from '../components/withForm';
import WithRecord from '../components/withRecord';
import RecordForm from '../components/RecordForm';

export default WithRecord(WithForm(RecordForm, axios.put));
