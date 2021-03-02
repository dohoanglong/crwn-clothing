import ShopActionsTypes from './shop.types'

export const updatedCollections = collectionsMap => ({
    type: ShopActionsTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})