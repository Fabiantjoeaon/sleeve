import { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { apiUrl } from '../helpers/urls';

export default class IndexPage extends Component {
    state = {
        records: []
    };

    async componentDidMount() {
        const { data } = await axios(apiUrl());
        this.setState({ records: data.items });
    }

    render() {
        return (
            <div>
                <Link href="/create">
                    <a>Create a new record</a>
                </Link>

                {this.state.records.map(r => (
                    <li key={r._id}>
                        <Link
                            as={`/record/${r._id}`}
                            href={`/record?id=${r._id}`}
                        >
                            <a>{r.artist}</a>
                        </Link>
                    </li>
                ))}
            </div>
        );
    }
}
