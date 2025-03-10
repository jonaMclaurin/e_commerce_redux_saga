import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { SignInSuccess, 
         SignInFailure, 
        signOutSuccess, 
        sigOutFailure,
        signUpSuccess,
        signUpFailure
        } from './user.actions'



export function* getSnapshotFromUserAuth(userAtuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAtuth, additionalData)
        const userSnapshot = yield userRef.get()
        yield put(SignInSuccess({id: userSnapshot.id, ...userSnapshot.data()  }))
    } catch(error){
        yield put(SignInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
       yield getSnapshotFromUserAuth(user)
    } catch(error) {
        yield put(SignInFailure(error))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch(error) {
        yield put(SignInFailure(error))
    }
}


export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser() 
        if(!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
    } catch(error){
        yield put(SignInFailure(error))
    }
}


export function* signOut() {
    try {
        yield auth.signOut() 
        yield put(signOutSuccess())
    }catch(error){
        yield put(sigOutFailure()) 
    }
}

export function* sigUp({payload: { email, password, displayName }}) {
    try {
        const { user } =  yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: { displayName }}))

    } catch(error){
        yield put(signUpFailure(error))
    }
}


export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}




export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle )
}


export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}


export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}



export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, sigUp)
}


export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp )
}


export function* userSagas() {
    yield all([call(onGoogleSignInStart), 
                call(onEmailSignInStart), 
                call(onCheckUserSession), 
                call(onSignUpStart),
                call(onSignUpSuccess),
                call(onSignOutStart)])
}