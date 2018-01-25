import axios from 'axios';
import { Component } from 'react';
import Link from 'next/link';

import { apiUrl } from '../helpers/urls';

const WithRecord = WrappedComponent => {
    return class extends Component {
        state = { record: {}, loading: false };

        async componentDidMount() {
            this.setState({ loading: true });
            const { data } = await axios(
                `${apiUrl()}/${this.props.url.query.id}`
            );
            this.setState({ record: data, loading: false });
        }

        render() {
            return (
                <div>
                    <Link href="/">
                        <a>&larr; Go back</a>
                    </Link>
                    {this.state.loading ? (
                        <h1>Loading..</h1>
                    ) : (
                        <WrappedComponent
                            record={this.state.record}
                            {...this.props}
                        />
                    )}
                </div>
            );
        }
    };
};

export default WithRecord;
