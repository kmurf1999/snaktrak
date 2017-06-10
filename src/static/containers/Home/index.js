import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './style.scss';

import Summary from './Summary/index';
import Log from './Log/index';
import Progress from './Progress/index';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';


class HomeView extends React.Component {
    constructor(props) {
      super(props);
    }

    static propTypes = {
        username: React.PropTypes.string,
        token: React.PropTypes.string,
        entries: React.PropTypes.array,
        activeEntries: React.PropTypes.array,
        isAuthenticated: React.PropTypes.bool
    };

    static defaultProps = {
        username: '',
    };

    render() {
        const { token, date, entries, isAuthenticated } = this.props;
        let page = null;
        if (!isAuthenticated) {
          page =  <section className="landing-page">
                    <h1>Welcome!</h1>
                    <div>
                      <Link to="/login"><button className="validation-resend">Login</button></Link>
                      <Link to="/signup"><button className="validation-resend">Sign up</button></Link>
                    </div>
                  </section>;
        } else {
          page =  <section className="main-page">
                    <Summary/><Progress/><Log/>
                  </section>;
        }

        return (
          <section>
            {page}
          </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
        entries: state.data.entries,
        activeEntries: state.data.activeEntries,
        date: state.menu.date
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
