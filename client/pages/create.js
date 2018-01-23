import { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';

import { apiUrl } from '../helpers/urls';

export default class Create extends Component {
    handleSubmit = async e => {
        e.preventDefault();
        const { name, artist, description } = e.target;
        await axios.post(apiUrl(), {
            name: name.value,
            artist: artist.value,
            description: description.value
        });

        Router.push('/');
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" />
                    </div>
                    <div>
                        <label>Artist</label>
                        <input type="text" name="artist" />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" />
                    </div>

                    <input type="submit" name="submit" value="submit" />
                </form>
            </div>
        );
    }
}
