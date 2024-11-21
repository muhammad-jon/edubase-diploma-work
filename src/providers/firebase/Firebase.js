import { initializeApp, getApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  initializeFirestore
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  signOut as fbSignOut
} from 'firebase/auth';
import noop from 'lodash/noop';
import { captureException } from '../../utils/logger';

// Firebase errors are captured for Sentry right here in methods
// but still being propagated to top
// DO NOT record errors again in catch block
class Firebase {
  constructor(firebaseKeys) {
    // Do not initialize the app if this step was already done.
    if (firebase.apps.length) {
      this.app = getApp();
    } else {
      this.app = initializeApp(firebaseKeys);
    }
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.firestore = initializeFirestore(this.app, {
      experimentalAutoDetectLongPolling: true
    });
  }

  subscribeAuthStateChange = nextOrObserver => {
    try {
      return this.auth.onAuthStateChanged(nextOrObserver);
    } catch (err) {
      captureException(err);
      return noop;
    }
  };

  createUser = ({ email, password, fullname }) =>
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        return user;
      })
      .then(user => {
        return this.createDocument(
          {
            uid: user.uid,
            email,
            fullname,
            avatar: Math.round(Math.random() * (6 - 1) + 1),
            quizzes: {},
            lessons: {}
          },
          {
            collectionName: 'users',
            id: user.uid,
            shouldReturnDoc: true
          }
        );
      })
      .catch(error => {
        captureException(error);
        throw new Error(error.message.replace('Firebase:', ''));
      });

  getUserData = user => {
    return this.getDocument({ collectionName: 'users', id: user.uid }).then(res => {
      if (res) {
        return res;
      }
      return this.createDocument(
        {
          uid: user.uid,
          quizzes: {},
          lessons: {}
        },
        {
          collectionName: 'users',
          id: user.uid,
          shouldReturnDoc: true
        }
      );
    });
  };

  signIn = ({ email, password }) =>
    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        return user;
      })
      .catch(error => {
        captureException(error);
        throw new Error(error.message.replace('Firebase:', ''));
      });

  updateProfile = data => fbUpdateProfile(this.auth.currentUser, data);

  getDocument = async ({ collectionName, id }) => {
    try {
      const docRef = doc(this.firestore, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id };
      }
      return null;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          id,
          uid: this.auth.currentUser?.uid,
          operation: 'getDoc'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  getReference = ({ collectionName, id }) => {
    return doc(this.firestore, collectionName, id);
  };

  createDocument = async (data, { collectionName, id, shouldReturnDoc }) => {
    try {
      const payloadWithTimestamp = {
        ...data,
        createdAt: new Date()
      };
      let res;
      // if id is not provided, random id is generated
      if (id) {
        res = await setDoc(doc(this.firestore, collectionName, id), payloadWithTimestamp);
      } else {
        res = await addDoc(collection(this.firestore, collectionName), payloadWithTimestamp);
      }

      return res;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          id,
          uid: this.auth.currentUser?.uid,
          operation: 'setDoc'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  batchWriteDocs = async ({ type, requests, collectionName }) => {
    try {
      const batch = writeBatch(this.firestore);
      requests.forEach(req => {
        switch (type) {
          case 'create': {
            const sfRef = doc(collection(this.firestore, collectionName));
            batch.set(sfRef, req);
            break;
          }
          case 'update': {
            const sfRef = doc(this.firestore, collectionName, req.docId);
            batch.update(sfRef, req.payload);
            break;
          }
          default:
            break;
        }
      });
      const res = await batch.commit();
      return res;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          operation: 'batch',
          type,
          uid: this.auth.currentUser?.uid
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  updateDocument = async (data, { id, collectionName }) => {
    try {
      const payloadWithTimestamp = {
        ...data,
        updatedAt: new Date()
      };
      const ref = doc(this.firestore, collectionName, id);
      const res = await updateDoc(ref, payloadWithTimestamp);
      return res;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          id,
          uid: this.auth.currentUser?.uid,
          operation: 'updateDoc'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  updateUser = async data => {
    try {
      const payloadWithTimestamp = {
        ...data,
        updatedAt: new Date()
      };
      const ref = doc(this.firestore, 'users', this.auth.currentUser?.uid);
      const res = await updateDoc(ref, payloadWithTimestamp);
      return res;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName: 'users',
          uid: this.auth.currentUser?.uid,
          operation: 'updateDoc'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  deleteDocument = async ({ collectionName, id }) => {
    try {
      const ref = doc(this.firestore, collectionName, id);
      const res = await deleteDoc(ref);
      return res;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          id,
          uid: this.auth.currentUser?.uid,
          operation: 'deleteDoc'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  getDocuments = async ({
    collectionName,
    returnOnlyFirst,
    withDocumentId = true,
    dataNormalizer,
    filters
  }) => {
    try {
      const queryFilterArray = filters.map(filter =>
        where(filter.key, filter.operator, filter.value)
      );
      const queryFilter = query(collection(this.firestore, collectionName), ...queryFilterArray);

      const querySnapshot = await getDocs(queryFilter);
      const result = querySnapshot.docs.map(document => {
        const data = {
          ...document.data(),
          ...(withDocumentId && {
            id: document.id
          })
        };
        return data;
      });

      if (dataNormalizer) {
        return dataNormalizer(result);
      }
      return returnOnlyFirst ? result?.[0] : result;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          filters,
          uid: this.auth.currentUser?.uid,
          operation: 'getDocs'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  onDocumentChange = ({ collectionName, id, onChangeCallback }) => {
    const unsub = onSnapshot(doc(this.firestore, collectionName, id), doc => {
      if (doc) {
        onChangeCallback(doc.data());
      }
    });
    return unsub;
  };

  onCollectionChange = async ({
    collectionName,
    id,
    withDocumentId = true,
    filters,
    onChangeCallback = () => {}
  }) => {
    try {
      const queryFilterArray = filters.map(filter =>
        where(filter.key, filter.operator, filter.value)
      );
      const queryFilter = query(
        collection(this.firestore, collectionName, id),
        ...queryFilterArray
      );
      const unsubcribe = onSnapshot(
        queryFilter,
        querySnapshot => {
          const result = querySnapshot.docs.map(document => {
            const data = {
              ...document.data(),
              ...(withDocumentId && {
                id: document.id
              })
            };
            return data;
          });
          onChangeCallback(result);
        },
        err => {
          captureException(err, {
            extra: {
              collectionName,
              filters,
              uid: this.auth.currentUser?.uid,
              operation: 'onSnapshot'
            }
          });
        }
      );
      return unsubcribe;
    } catch (err) {
      captureException(err, {
        extra: {
          collectionName,
          filters,
          uid: this.auth.currentUser?.uid,
          operation: 'onSnapshot'
        }
      });
      throw new Error(err.message.replace('Firebase:', ''));
    }
  };

  signOut = () => fbSignOut(this.auth);
}

export default Firebase;
