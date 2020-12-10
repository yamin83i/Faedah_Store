import {NAME_CHANGE,EMAIL_CHANGE,PASSWORD_CHANGE,PASSWORDCONFIRM_CHANGE,ALAMAT_CHANGE,PHONENUMBER_CHANGE} from "./type"

const nameChange = (text) => {
    return {
      type: NAME_CHANGE,
      payload: text,
    };
  };

const emailChange = (text) => {
    return {
      type: EMAIL_CHANGE,
      payload: text,
    };
  };

const passwordChange = (text)=>{
    return{
        type:PASSWORD_CHANGE,
        payload:text
    }
}
const passwordconfirmChange = (text)=>{
    return{
        type:PASSWORDCONFIRM_CHANGE,
        payload:text
    }
}

const alamatChange =(text)=>{
  return{
    type:ALAMAT_CHANGE,
    payload:text
  }
}

const phoneChange = (text)=>{
    return{
        type:PHONENUMBER_CHANGE,
        payload:text
    }
}

  export { nameChange,emailChange,passwordChange,passwordconfirmChange,alamatChange,phoneChange  };