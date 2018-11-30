import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const categories = [
    {id: 0, name: 'video'},
    {id: 1, name: 'computers'},
    {id: 2, name: 'audio'}
];

class Products extends React.Component {
    state = {
        value: 0,
    };

    componentDidMount(){
        const { match } = this.props;
        const { categoryId } = match.params;

        categories.map(category => {
            if(category.name === categoryId){
                this.setState({
                    value: category.id
                });
            }
        });
        
    }

    handleChange = (event, value) => {
        const {history} = this.props;

        this.setState({ value });
        history.replace(`/products/${categories[value].name}`);
        
    };

    render(){
        const { value } = this.state;
        return (
            <div>
                <h2>Products</h2>
                <Tabs value={value} onChange={this.handleChange}>
                    {
                        categories.map(category => <Tab key={category.id} label={category.name} />)
                    }
                </Tabs>
                {value === 0 && <p>video content</p>}
                {value === 1 && <p>computers content</p>}
                {value === 2 && <p>audio content</p>}
            </div>
        )
    }
}

export default Products;