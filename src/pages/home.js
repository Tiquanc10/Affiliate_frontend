import React, { Component, Fragment } from 'react';
import { Card, Button, Container } from 'react-bootstrap'
import axios from 'axios';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }


        this.getPosts = this.getPosts.bind(this)
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

    componentDidMount() {
        this.getPosts();
    }
    render() {
        return (
            <Fragment>
                <Container fluid className='products' >
                <p> On this page you will find my "HOT TECH" picks available on Amazon.</p>
                </Container>
                <Container fluid className='products' >
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
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Container>
            </Fragment>
        )
    }
}