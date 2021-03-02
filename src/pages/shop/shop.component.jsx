import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import CollectionsOverview from "../../components/collections-overview/collection-overview.component";
import CollectionPage from "../../components/collection/collection.component";

import { updatedCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state={
    loading: true
  }
  unsubcribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const CollectionRef = firestore.collection("collections");

    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections))

    CollectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    });
  }

  render() {
    const { match } = this.props;
    const {loading} = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
        <Route
          path={`${match.path}/:collectionId`}
          render = {(props=> <CollectionPageWithSpinner isLoading={loading} {...props}/>)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updatedCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
