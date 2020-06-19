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
};
