import React from 'react';

export default class Loader extends React.Component {
    render() {
        const { type } = this.props;
        return (
            <div class={"flex-center"}>
                <div class={"loader-" + type} />
            </div>
        );
    }
}