import React, { PureComponent } from 'react';
// import '../../assets/stylesheets/components/_spinner.sass';

class Spinner extends PureComponent {
    render() {
        return (
            <div className="cssload-thecube">
                <div className="cssload-cube cssload-c1" />
                <div className="cssload-cube cssload-c2" />
                <div className="cssload-cube cssload-c4" />
                <div className="cssload-cube cssload-c3" />
            </div>
        );
    }
}

export default Spinner;
