function mockLogin(pin) {
  return new Promise((resolve, reject) => {
    if (pin == '2137')
      resolve({ data: { isCreator: true } });
    else if (pin == '6969')
      resolve({ data: { isCreator: false } });
    else
      reject("Wrong PIN number")
  });
}

export default mockLogin;
