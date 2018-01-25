import { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import { apiUrl } from '../helpers/urls';
import WithRecord from '../components/withRecord';

class Record extends Component {
    deleteRecord = async () => {
        await axios.delete(`${apiUrl()}/${this.props.url.query.id}`);
        Router.push('/');
    };

    render() {
        const { record } = this.props;
        return (
            <div>
                <h1>Name: {record.name}</h1>
                <h2>Artist: {record.artist}</h2>
                <p>Description: {record.description}</p>
                <br />
                <span onClick={this.deleteRecord}>&times; DELETE</span>
                &nbsp;
                <Link href={`/edit?id=${record._id}`}>
                    <a>Edit</a>
                </Link>
            </div>
        );
    }
}

export default WithRecord(Record);
