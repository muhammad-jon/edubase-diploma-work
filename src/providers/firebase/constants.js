export const config = {
  apiKey: 'AIzaSyCu54O8wC0t1pOEd6LiOygZhH3a4iLwHWc',
  authDomain: 'bmi-c254e.firebaseapp.com',
  projectId: 'bmi-c254e',
  storageBucket: 'bmi-c254e.firebasestorage.app',
  messagingSenderId: '881470878218',
  appId: '1:881470878218:web:e06c18289175de87db25f3',
  measurementId: 'G-6R0NVJTBVS'
};

export const FIRESTORE_COLLECTIONS = {
  preferences: 'preferences',
  drafts: 'drafts',
  timers: 'timers',
  snippets: 'snippetsV2',
  defaultTeamSnippets: 'defaultTeamSnippets',
  timeEntryDrafts: 'timeEntryDrafts'
};

export const generateTimerId = ({ memberId, ticketId }) => `${memberId}-${ticketId}`;
export const generateDraftId = ({ memberId, ticketId }) => `${memberId}-${ticketId}`;
