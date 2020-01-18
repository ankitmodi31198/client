import React, { Component } from 'react';
import { MdArrowBack } from 'react-icons/md'
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

class MyFavourites extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userFavourites: this.props.userFavourites
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.userFavourites.length === 0 ? 
                    (<h5>no favourite food yet :)</h5>)
                    :
                    (
                        <div>
                            {this.viewFoods()}
                        </div>
                    )
                }                
            </React.Fragment>
        )
    }

    viewFoods() {
        return <div className="container">
            <Button onClick={this.props.closeFavourites} outline color="success"><MdArrowBack></MdArrowBack></Button>
            {this.state.userFavourites.map((uf, key) => <div key={key}>
                <Card>

                    <CardBody>
                        <CardTitle>{uf.food.name}</CardTitle>
                        <Button>View</Button>
                    </CardBody>
                </Card>
            </div>)}
        </div>;
    }
}

export default MyFavourites