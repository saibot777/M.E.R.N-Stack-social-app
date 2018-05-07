import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {deletePost, addLike, removeLike} from "../../../store/selectors";

class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id)
    }

    onLikeClick(id) {
        this.props.addLike(id)
    }

    onDislikeClick(id) {
        this.props.removeLike(id)
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false
        }
    }

    render() {
        const { post, auth } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                                 alt="" />
                        </Link>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {post.text}
                        </p>
                        <button
                            onClick={this.onLikeClick.bind(this, post._id)}
                            type="button"
                            className="btn btn-light mr-1">
                            <i className={classnames('fas fa-thumbs-up', {
                                'text-info' : this.findUserLike(post.likes)
                            })}/>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button
                            onClick={this.onDislikeClick.bind(this, post._id)}
                            type="button"
                            className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"/>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                        {
                            post.user === auth.user.id
                                ? ( <button type="button" onClick={this.onDeleteClick.bind(this, post._id)} className="btn btn-danger mr-1"><i className="fas fa-times"/></button> )
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.any.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
