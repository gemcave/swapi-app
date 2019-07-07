import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';

import './item-details.css';


const Record = ({ item, field, label }) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export {
	Record 
};

export default class ItemDetails extends Component {
	
	swapiService = new SwapiService();

	state = {
		item: null,
		loading: true,
		image: null
 	}
	componentDidMount() {
		this.updateitem();
	}
componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId ||
				this.props.getData !== prevProps.getData ||
				this.props.getImageUrl !== prevProps.getImageUrl)  {
			this.setState({loading: true});
			this.updateitem();
		}
	}

	updateitem() {
		const { itemId, getData, getImageUrl} = this.props;

		if (!itemId) {
			return;
		}
		getData(itemId)
			.then((item) => {
				this.setState({
					item,
					loading: false,
					image: getImageUrl(item)
				});
			});
	}
  render() {
		const { item, image} = this.state;

		if (!item) {
			return <span>Select a item from a list</span>;
		}
		
		const { name } = item;
		// const spinner = loading ? <Spinner /> : null;
		// const itemDetailsElement = !loading ? <ItemDetailsElement item={item} img={image}/> : null;

    return (
      <div className="item-details card">
				{/* { spinner } */}
        <img className="item-image"
          src={image}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
							{
								React.Children.map(this.props.children, (child) => {
									return React.cloneElement(child, {item});
								})
							}
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  };
}


// const ItemDetailsElement = ({item},img) => {
// 			const { id, name, gender, 
// 									birthYear, eyeColor} = item;
// 			// const imageUrl = this.props.children;
// 			console.log(img);
// 			const { image } = img;
		
// 			return (
// 				<React.Fragment>
// 						<img className="item-image"
// 							src={image}
// 							alt="character"/>
// 						<div className="card-body">
// 							<h4>{name}</h4>
// 							<ul className="list-group list-group-flush">
// 								<li className="list-group-item">
// 									<span className="term">Gender</span>
// 									<span>{gender}</span>
// 								</li>
// 								<li className="list-group-item">
// 									<span className="term">Birth Year</span>
// 									<span>{birthYear}</span>
// 								</li>
// 								<li className="list-group-item">
// 									<span className="term">Eye Color</span>
// 									<span>{eyeColor}</span>
// 								</li>
// 							</ul>
// 							<ErrorButton />
// 						</div>
// 				</React.Fragment>
// 			);
// }