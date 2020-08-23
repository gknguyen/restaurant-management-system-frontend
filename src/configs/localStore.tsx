export function getAuthenticatedUser() {
  const results = {
    id: '',
    role: '',
    username: '',
    fullName: '',
    age: 0,
    phoneNumber: '',
    email: '',
    avatar: '',
    activeStatus: false,
    loginDateTime: new Date(),
    authToken: '',
  };
  const userDataString = sessionStorage.getItem('user');
  let userData: any = {};
  if (userDataString) {
    userData = JSON.parse(userDataString);
  }
  if (userData) {
    results.id = userData.id;
    results.role = userData.userType.typeName;
    results.username = userData.username;
    results.fullName = userData.fullName;
    results.age = userData.age;
    results.phoneNumber = userData.phoneNumber;
    results.email = userData.email;
    results.avatar = userData.avatar;
    results.activeStatus = userData.activeStatus;
    results.loginDateTime = userData.loginDateTime;
    results.authToken = userData.authToken;
  }
  return results;
}

export function getAuthToken() {
  const tokenDataString = localStorage.getItem('token');
  const token = tokenDataString ? (JSON.parse(tokenDataString) as string) : '';
  return token;
}

export function getProductId() {
  const productId = sessionStorage.getItem('productId');
  return productId;
}

export function getUserId() {
  const userId = sessionStorage.getItem('userId');
  return userId;
}
