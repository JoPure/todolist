import React from "react";
import ReactDOM from "react-dom";
//import css from './style.css';
require('./style.css');

//TodoList组件是一个整体的组件，最终React也只渲染这个组件
//TodoList组件是两个组件的集合
var TodoList = React.createClass({
    //初始化
    getInitialState: function () {
        return {
            todolist: []
        };
    },

    //添加
    handleAdd: function (text) {
        this.setState({
            todolist: text
        });
    },

    render: function () {
        return (
            <div>
                <h2 className="top">react-todolist</h2>
                <TypeNew add={this.handleAdd} todo={this.state.todolist}/>
                <ListTodo todo={this.state.todolist} del={this.handleAdd}/>
            </div>
        );
    }
});

var TypeNew = React.createClass({
    addContent: function (e) {
        e.preventDefault();
        var tet = this.refs.content.value.trim();
        if (tet != '') {
            this.props.todo.push(tet);
            this.props.add(this.props.todo);
        }
        this.refs.content.value = '';
    },

    render: function () {
        return (
            <form onSubmit={this.addContent} className="form">
                <input type="text" ref="content" placeholder="请输入您的todolist" className="input"/>
                <input type="submit" value="添加" className="add"/>
            </form>
        );
    }
});

var ListTodo = React.createClass({
    delContent: function (e) {
        var i = e.target.getAttribute("data-index");
        this.props.todo.splice(i, 1);
        this.props.del(this.props.todo);
    },

    render: function () {
        return (
            <ul id="todo-list">
                {
                    //map方法 遍历,es6的语法,类似foreach,循环生成li
                    this.props.todo.map(function (text, i) {
                        return (
                            <li className="content">
                                <label>{text}</label>
                                <span className="del" onClick={this.delContent} data-index={i}>×</span>
                            </li>
                        );
                    }.bind(this))
                }
            </ul>
        );
    }
});


ReactDOM.render(
    <TodoList />,
    document.getElementById("example")
);
