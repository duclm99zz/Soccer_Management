export const userDetailedQuery = ({auth, userUid}) => {
  if (userUid !== null) {
    return [
      {
        collection: 'Users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'Users',
        doc: userUid,
        subcollections: [{collection: 'photos'}],
        storeAs: 'photos'
      }
    ]
  } else {
    return [
      {
        collection: 'Users',
        doc: auth.uid,
        subcollections: [{collection: 'photos'}],
        storeAs: 'photos'
      }
    ]
  }
  
}