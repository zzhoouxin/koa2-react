import Request from '../../utils/request';

const signInApi = async (userInfo) => {
  const result = await Request.post({
    url: '/login/user/signIn',
    data: userInfo,
  });
  return result;
};

export { signInApi };
