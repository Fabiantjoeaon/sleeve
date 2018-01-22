import { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { apiUrl } from '../helpers/urls';

export default class Record extends Component {
    state = {
        record: {}
    };

    async componentDidMount() {
        const { url } = this.props;
        const { data } = await axios(`${apiUrl()}/${url.query.id}`);
        this.setState({ record: data });
    }

    render() {
        const { record } = this.state;
        return (
            <div>
                <h1>{record.name}</h1>
                <span>Delete</span>
            </div>
        );
    }
}
