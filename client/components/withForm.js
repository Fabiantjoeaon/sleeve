import { Component } from 'react';
import Router from 'next/router';

import { apiUrl } from '../helpers/urls';

const WithForm = (WrappedComponent, httpMethod) => {
    return class extends Component {
        submit = async e => {
            const url = this.props.record
                ? `${apiUrl()}/${this.props.record._id}`
                : apiUrl();

            e.preventDefault();
            const { name, artist, description } = e.target;

            await httpMethod(url, {
                name: name.value,
                artist: artist.value,
                description: description.value
            });

            Router.push('/');
        };

        render() {
            return (
                <form onSubmit={this.submit} {...this.props}>
                    <WrappedComponent {...this.props} />
                </form>
            );
        }
    };
};

export default WithForm;
