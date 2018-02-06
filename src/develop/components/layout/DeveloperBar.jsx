import React, { PureComponent } from 'react';

class DeveloperBar extends PureComponent {
    render() {
        return (
            <div className="developer-info">
                BUILD_ENV: <i>({process.env.BUILD_ENV})</i>
            </div>
        );
    }
}

export default DeveloperBar;
