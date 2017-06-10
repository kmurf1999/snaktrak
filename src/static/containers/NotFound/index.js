import React from 'react';
import './style.scss';
import { Link } from 'react-router';

import spongeBobPath from './images/spongebob.jpg';


export default class NotFoundView extends React.Component {

    render() {
        return (
            <div className="not-found">
                <img src={spongeBobPath} className="rounded img-fluid" />
                <h1>NOT FOUND.</h1>
                <p>
                  Sorry, this page doesn't exist
                  Use the menu bar to navigate
                  or go to <Link to="/">home</Link>
                </p>
            </div>
        );
    }

}
