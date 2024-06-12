const isMPT = (phone) => {
    const first4 = phone.slice(0, 4);
    const first5 = phone.slice(0, 5);
    const phoneLength = phone.length;
    let isMPT = false;
  
    switch (first4) {
      case '9592':
        if (phoneLength === 10 || (phoneLength === 12 && (first5 === '95925' || first5 === '95926'))) {
          isMPT = true;
        }
        break;
      case '9594':
        if (phoneLength === 11 && (first5 === '95941' || first5 === '95943')) {
          isMPT = true;
        } else if (phoneLength === 12 && ['95940', '95942', '95944', '95945'].includes(first5)) {
          isMPT = true;
        }
        break;
      case '9595':
        if (phoneLength === 10) {
          isMPT = true;
        }
        break;
      case '9598':
        if (phoneLength === 12 && ['95988', '95989'].includes(first5)) {
          isMPT = true;
        }
        break;
      default:
        break;
    }
    return isMPT;
  };
  
  const isTelenor = (phone) => phone.startsWith('9597') && phone.length === 12;
  
  const isOoredoo = (phone) => phone.startsWith('9599') && phone.length === 12;
  
  const isMyTel = (phone) => phone.startsWith('9596') && phone.length === 12;
  
  const isMec = (phone) => {
    const startNumber = phone.slice(0, 4);
    const phoneLength = phone.length;
    return startNumber === '9593' && (phoneLength === 11 || (phone.startsWith('95934') && phoneLength === 12));
  };
  
  const checkMyanmarPhoneNumber = (phone_number) => {
    const firstNumber = phone_number.charAt(0);
    const startNumber = phone_number.slice(0, 3);
    const phoneLength = phone_number.length;
    let operator = 0;
  
    if (firstNumber === '0') {
      phone_number = '95' + phone_number.slice(1);
    } else if (firstNumber === '9') {
      if (startNumber === '959') {
        if (phoneLength === 8) {
          operator = 1; // MPT
          return { operator, phone_number: '95' + phone_number };
        } else if (phoneLength === 9) {
          operator = 2; // Ooredoo
          return { operator, phone_number };
        }
      } else {
        if (isOoredoo('959' + phone_number)) {
          operator = 2; // Ooredoo
          return { operator, phone_number: '959' + phone_number };
        }
        phone_number = '95' + phone_number;
      }
    } else {
      phone_number = '959' + phone_number;
    }
  
    if (isMPT(phone_number)) {
      operator = 1; // MPT
    } else if (isTelenor(phone_number)) {
      operator = 5; // Telenor
    } else if (isOoredoo(phone_number)) {
      operator = 2; // Ooredoo
    } else if (isMyTel(phone_number)) {
      operator = 6; // MyTel
    } else if (isMec(phone_number)) {
      operator = 4; // MEC
    }
  
    if ([0, 3, 4].includes(operator)) {
      return { error: "Invalid operator" };
    }
    return { operator, phone_number };
  };
  
  module.exports = { checkMyanmarPhoneNumber, isMPT, isTelenor, isOoredoo, isMyTel, isMec };
  