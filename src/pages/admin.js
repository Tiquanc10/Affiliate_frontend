import React, { Component, Fragment } from 'react';
import { Form, Container, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default class Admin extends Component {
    constructor() {
        super();

        this.state = {
            addItem: false,
            title: "",
            desc: "",
            category: "",
            url: "",
            img_url: "",
            posts: [],
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.deletePost = this.deletePost.bind(this);

    }

    handleToggle() {
        this.setState({
            addItem: !this.state.addItem
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAdd(event) {
        event.preventDefault();
        let item = {
            title: this.state.title,
            desc: this.state.desc,
            category: this.state.category,
            url: this.state.url,
            img_url: this.state.img_url
        }

        axios
            .post("https://tcvisionspicks.herokuapp.com/post", item)
            .then(res => console.log(res))
            .catch(err => console.error(err))
            .finally(this.handleToggle)
    }
    getPosts() {
        axios.get('https://tcvisionspicks.herokuapp.com/posts')
            .then((response) => {
                this.setState({
                    posts: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deletePost(id) {
        axios.delete(`https://tcvisionspicks.herokuapp.com/post/${id}`)
            .then((response) => {
                this.getPosts()
            })
    }
    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <Container>
                {this.state.addItem ?
                    <Form onSubmit={this.handleAdd}>
                        <Form.Group>

                            <Form.Label>Item Name</Form.Label>
                            <Form.Control as="input" type="text" name="title" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="input" type="text" name="desc" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="input" type="text" name="category" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amazon URL</Form.Label>
                            <Form.Control as="input" type="text" name="url" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control as="input" type="text" name="img_url" onChange={this.handleChange} />
                        </Form.Group>
                        <Button type="submit">Add Item</Button>
                    </Form>
                    :
                    <Fragment>
                        <hr />
                        <Button variant='success' onClick={this.handleToggle}> Add Item </Button>
                        <hr />
                    </Fragment>
                }
                {this.state.posts.map((post) => {
                    return (
                        <Card style={{ width: '60vw' }}>
                            <Card.Img variant="top" src={post.img_url} />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.desc}
                                </Card.Text>
                                <Button as="a" href={post.url} target="_blank" variant="primary">Get Item</Button>
                                <Button variant='danger' onClick={() => this.deletePost(post.id)}>delete</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        )
    }
}