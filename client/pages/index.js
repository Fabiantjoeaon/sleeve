import { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { apiUrl } from '../helpers/urls';

export default class IndexPage extends Component {
    state = {
        records: []
    };

    async componentDidMount() {
        await this.fetchData(`${apiUrl()}`);
    }

    async fetchData(url) {
        const { data } = await axios(url);
        const { items: records } = data;
        this.setState({ records });
    }

    render() {
        const { records } = this.state;

        return (
            <div>
                <Link href="/create">
                    <a>Create a new record</a>
                </Link>

                {records.length > 0 &&
                    records.map(r => (
                        <li key={r._id}>
                            <Link href={`/record?id=${r._id}`}>
                                <a>{r.artist}</a>
                            </Link>
                        </li>
                    ))}
            </div>
        );
    }
}
