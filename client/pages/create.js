import axios from 'axios';
import Router from 'next/router';

import RecordForm from '../components/RecordForm';
import WithForm from '../components/withForm';

export default WithForm(RecordForm, axios.post);
