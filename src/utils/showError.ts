import {message} from "antd";

const showError = (errormessage:string) => {
    message.error(errormessage);
  };

  export default showError;