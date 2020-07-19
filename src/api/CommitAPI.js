import { ajax } from './fetch';

export default {
  sendCommit(commit, loading) {
    const request = {
      method: 'POST',
      url: 'commits',
      data: commit.toData(),
    };
    return ajax(request, loading);
  },
  getCommitsByDid(did, loading) {
    const request = {
      method: 'GET',
      url: `commits/developer/${did}`,
    };
    return ajax(request, loading);
  },
  getCommitInfoById(ccid, loading) {
    const request = {
      method: 'GET',
      url: `commits/${ccid}`,
    };
    return ajax(request, loading);
  },
  getCommitItemInfoById(ccid, loading) {
    const request = {
      method: 'GET',
      url: `items/commit/${ccid}`,
    };
    return ajax(request, loading);
  },
};
