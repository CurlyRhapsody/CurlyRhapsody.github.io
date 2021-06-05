import React from 'react';
import ReactDOM from 'react-dom';

var floor = 1;

class PostButton extends React.Component {
    PostComment() {
        ReactDOM.render(<NewComment />, document.getElementById('CSection'));
    }

    render() {
        return <button onclick={this.PostComment}>Submit</button>;
    }
}

class NewComment extends React.Component {
    constructor() {
        super();
        floor += 1;
        this.name = document.getElementById('name').value;
        this.content = document.getElementById('content').value;
        this.date = new Date();
    }

    render() {
        return (
            <div style="margin='2px solid black'">
                <p style="text-align: left; line-height: 0px;">#{floor} <b>{this.name}</b> @ {this.date}</p>
                <p style="text-align: left; line-height: 0px;">{this.content}</p>
            </div>
        );
    }
}