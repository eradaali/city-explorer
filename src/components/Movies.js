import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
export class Movies extends React.Component {
    render() {
        return (
            this.props.movieInfo.map((data, index) => {
                return (<div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img style={{ width: '10rem' }} variant="top" src={data.image_url} />
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text>
                                <p>{data.overview} <br />{data.average_votes}<br></br>{data.release_date}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>)
            })
        )
    }
}

export default Movies
